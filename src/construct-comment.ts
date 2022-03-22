import { CommentData } from './types';
import { getCoverageDifferenceEmoji, getCoverageEmoji, getCoverageAfterPr } from './construct-comment-utils';


const constructComment = async (commentData: CommentData): Promise<string> => {
  let message: string;

  if(commentData.lines.diff === 0 || commentData.lines.diff) {
    message = `
## Code Coverage

|           | Current Coverage                             | Coverage After PR                                                 |                                                                |
|-----------|----------------------------------------------|-------------------------------------------------------------------|--------------------------------------------------------------- |
| Lines     | ${commentData.lines.percent.toFixed(2)}%     | ${getCoverageAfterPr(commentData.lines.percent, commentData.lines.diff)}      | ${getCoverageDifferenceEmoji(commentData.lines.diff)}     |
| Functions | ${commentData.functions.percent.toFixed(2)}% | ${getCoverageAfterPr(commentData.functions.percent, commentData.functions.diff)}  | ${getCoverageDifferenceEmoji(commentData.functions.diff)} |
| Branches  | ${commentData.branches.percent.toFixed(2)}%  | $${getCoverageAfterPr(commentData.branches.percent, commentData.branches.diff)}   | ${getCoverageDifferenceEmoji(commentData.branches.diff)}  |
<!-- coverage-action-comment -->
`;
  } else {
    message = `
## Code Coverage
|           | Current Coverage                             |                                                    |
|-----------|----------------------------------------------|----------------------------------------------------|
| Lines     | ${commentData.lines.percent.toFixed(2)}%     | ${getCoverageEmoji(commentData.lines.percent)}     |
| Functions | ${commentData.functions.percent.toFixed(2)}% | ${getCoverageEmoji(commentData.functions.percent)} |
| Branches  | ${commentData.branches.percent.toFixed(2)}%  | ${getCoverageEmoji(commentData.branches.percent)}  |
<!-- coverage-action-comment -->
`;
  }

  return message;
};

export default constructComment;
