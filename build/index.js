"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const get_data_1 = require("./get-data");
const make_comment_1 = require("./make-comment");
const send_data_1 = require("./send-data");
const run = async () => {
    try {
        const url = (0, core_1.getInput)('coverageEndpoint');
        const authToken = (0, core_1.getInput)('coverageToken');
        if (!authToken && url) {
            (0, core_1.warning)('Failed to retrieve `coverageToken`. See configuration for instructions on how to add coverageToken to action.');
        }
        else if (!url && authToken) {
            (0, core_1.warning)('Failed to retrieve `coverageEndpoint` from action. See configuration for instructions on how to add covergeEndpoint to action.');
        }
        let prData = await (0, get_data_1.getData)(authToken);
        if (url && authToken) {
            try {
                prData = await (0, send_data_1.default)(url, prData);
            }
            catch (error) {
                console.log(`${error}, Could not send data, printing comment`);
            }
        }
        console.log(`Repo ID: ${prData.repositoryId}`);
        console.log(`Ref of branch being merged: ${prData.ref}`);
        console.log(`Ref of branch being merged into: ${prData.baseRef}`);
        console.log(`SHA of merge commit: ${prData.sha}`);
        console.log(`PR creator: ${prData.actor}`);
        console.log(`Time PR created: ${prData.timestamp}`);
        console.log(`Lines percent: ${prData.coverage.lines.percent}`);
        console.log(`Functions percent: ${prData.coverage.functions.percent}`);
        console.log(`Branches percent: ${prData.coverage.branches.percent}`);
        if (prData.coverage.lines.diff || prData.coverage.lines.diff === 0) {
            console.log(`Lines difference: ${prData.coverage.lines.diff}`);
        }
        if (prData.coverage.functions.diff || prData.coverage.functions.diff === 0) {
            console.log(`Functions difference: ${prData.coverage.functions.diff}`);
        }
        if (prData.coverage.branches.diff || prData.coverage.branches.diff === 0) {
            console.log(`Branches Difference: ${prData.coverage.branches.diff}`);
        }
        if (prData.message) {
            console.log(`Message: ${prData.message}`);
        }
        if (prData.pullRequest) {
            console.log(`Pull Request Number: ${prData.pullRequest}`);
        }
        if (github_1.context.payload.pull_request) {
            (0, make_comment_1.default)(prData.message, prData.coverage);
        }
    }
    catch (error) {
        (0, core_1.setFailed)(`Coverage action failed to run: ${error.message}`);
    }
};
run();
