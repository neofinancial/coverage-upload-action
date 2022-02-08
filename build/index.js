"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const get_data_1 = require("./get-data");
const make_comment_1 = require("./make-comment");
const send_data_1 = require("./send-data");
const run = async () => {
    try {
        const prData = await (0, get_data_1.default)();
        const url = (0, core_1.getInput)('coverageEndpoint');
        if (url) {
            try {
                prData.coverage = await (0, send_data_1.default)(url, prData);
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
        console.log(prData.coverage.lines.diff);
        console.log(prData.coverage.functions.diff);
        console.log(prData.coverage.branches.diff);
        if (prData.pullRequest) {
            console.log(prData.pullRequest);
        }
        if (github_1.context.payload.pull_request) {
            (0, make_comment_1.default)(prData.coverage);
        }
    }
    catch (error) {
        (0, core_1.setFailed)(error.message);
    }
};
run();
