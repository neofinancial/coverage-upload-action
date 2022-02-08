"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const construct_comment_utils_1 = require("./construct-comment-utils");
const constructComment = async (commentData) => {
    let message;
    if (commentData.lines.diff) {
        message = `
## Code Coverage

|           | Current Coverage                             | Difference After PR                                               |                                                                |
|-----------|----------------------------------------------|-------------------------------------------------------------------|--------------------------------------------------------------- |
| Lines     | ${commentData.lines.percent.toFixed(2)}%     | ${(0, construct_comment_utils_1.getCoverageIncreaseOrDecreaseSign)(commentData.lines.diff)}      | ${(0, construct_comment_utils_1.getCoverageDifferenceEmoji)(commentData.lines.diff)}     |
| Functions | ${commentData.functions.percent.toFixed(2)}% | ${(0, construct_comment_utils_1.getCoverageIncreaseOrDecreaseSign)(commentData.functions.diff)}  | ${(0, construct_comment_utils_1.getCoverageDifferenceEmoji)(commentData.functions.diff)} |
| Branches  | ${commentData.branches.percent.toFixed(2)}%  | ${(0, construct_comment_utils_1.getCoverageIncreaseOrDecreaseSign)(commentData.branches.diff)}   | ${(0, construct_comment_utils_1.getCoverageDifferenceEmoji)(commentData.branches.diff)}  |
<!-- coverage-action-comment -->
`;
    }
    else {
        message = `
## Code Coverage

|           | Current Coverage                             |                                                    |
|-----------|----------------------------------------------|----------------------------------------------------|
| Lines     | ${commentData.lines.percent.toFixed(2)}%     | ${(0, construct_comment_utils_1.getCoverageEmoji)(commentData.lines.percent)}     |
| Functions | ${commentData.functions.percent.toFixed(2)}% | ${(0, construct_comment_utils_1.getCoverageEmoji)(commentData.functions.percent)} |
| Branches  | ${commentData.branches.percent.toFixed(2)}%  | ${(0, construct_comment_utils_1.getCoverageEmoji)(commentData.branches.percent)}  |

<!-- coverage-action-comment -->
`;
    }
    return message;
};
exports.default = constructComment;
