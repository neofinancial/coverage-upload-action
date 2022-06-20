"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const sendDataDiff = async (url, prData) => {
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
        const response = await axios_1.default.post(url, postData);
        prData.coverage.lines.diff = response.data.linesDifference;
        prData.coverage.functions.diff = response.data.functionsDifference;
        prData.coverage.branches.diff = response.data.branchesDifference;
        return prData.coverage;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.default = sendDataDiff;
