"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const action_1 = require("@octokit/action");
const construct_comment_1 = require("./construct-comment");
const makeComment = async (commentData) => {
    try {
        if (!github_1.context.payload.pull_request) {
            (0, core_1.setFailed)('No pull requests found');
            return;
        }
        const githubRepo = process.env.GITHUB_REPOSITORY;
        if (!githubRepo) {
            (0, core_1.setFailed)('No repo found');
            return;
        }
        const [owner, repo] = githubRepo.split('/');
        const pullRequestNumber = github_1.context.payload.pull_request.number;
        const octokit = new action_1.Octokit();
        const comments = await octokit.issues.listComments({
            owner,
            repo,
            issue_number: pullRequestNumber,
        });
        const botComment = comments.data.find((comment) => comment.body?.includes('<!-- coverage-action-comment -->'));
        const message = await (0, construct_comment_1.default)(commentData);
        console.log(botComment);
        console.log(message);
        if (!botComment) {
            octokit.issues.createComment({
                owner: owner,
                repo: repo,
                issue_number: pullRequestNumber,
                body: message,
            });
        }
        else {
            octokit.issues.updateComment({
                owner: owner,
                repo: repo,
                comment_id: botComment.id,
                body: message,
            });
        }
    }
    catch (error) {
        console.log(error.toString());
    }
};
exports.default = makeComment;
