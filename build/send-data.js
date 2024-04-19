"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const sendPullRequestData = async (url, prData) => {
    const postData = {
        id: prData.repositoryId,
        ref: prData.ref,
        baseRef: prData.baseRef,
        hash: prData.sha,
        actor: prData.actor,
        linesHit: prData.coverage.lines.hit,
        linesFound: prData.coverage.lines.found,
        functionsHit: prData.coverage.functions.hit,
        functionsFound: prData.coverage.functions.found,
        branchesHit: prData.coverage.branches.hit,
        branchesFound: prData.coverage.branches.found,
        token: prData.token,
    };
    if (prData.pullRequest) {
        postData.pullRequest = prData.pullRequest;
    }
    try {
        const { data: responseData } = await axios_1.default.post(url, postData);
        if (responseData.type === 'difference') {
            prData.coverage.lines.diff = responseData.data.linesDifference;
            prData.coverage.functions.diff = responseData.data.functionsDifference;
            prData.coverage.branches.diff = responseData.data.branchesDifference;
        }
        else if (responseData.type === 'comment') {
            prData.message = responseData.data.comment;
        }
        return prData;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.default = sendPullRequestData;
