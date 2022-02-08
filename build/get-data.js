"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const get_coverage_1 = require("./get-coverage");
const getData = async () => {
    const authToken = (0, core_1.getInput)('coverageToken');
    const prData = {
        repositoryId: github_1.context.payload.repository?.id,
        ref: '',
        baseRef: '',
        sha: '',
        actor: '',
        timestamp: Date.now().toString(),
        coverage: {
            lines: { hit: 0, found: 0, percent: 0, diff: 0 },
            functions: { hit: 0, found: 0, percent: 0, diff: 0 },
            branches: { hit: 0, found: 0, percent: 0, diff: 0 },
        },
        token: authToken,
    };
    const info = github_1.context.payload;
    if (info.pull_request) {
        prData.ref = info.pull_request.head.ref;
        prData.baseRef = info.pull_request.base.ref;
        prData.sha = info.pull_request.head.sha;
        prData.timestamp = info.pull_request.created_at;
        prData.pullRequest = info.number;
    }
    else {
        prData.ref = info.ref.replace('refs/heads/', '');
        prData.baseRef = info.base_ref;
        prData.sha = info.after;
        prData.timestamp = info.head_commit.timestamp;
    }
    if (info.repository && info.sender) {
        prData.actor = info.sender.login;
    }
    else {
        throw new Error('Issue with context');
    }
    const coverageData = (0, core_1.getInput)('coverageData');
    const commentData = await (0, get_coverage_1.default)(coverageData);
    prData.coverage.lines = commentData.lines;
    prData.coverage.functions = commentData.functions;
    prData.coverage.branches = commentData.branches;
    return prData;
};
exports.default = getData;
