"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lcov = require("lcov-parse");
const util_1 = require("util");
const lcovParse = (0, util_1.promisify)(lcov);
const getCoverage = async (path) => {
    try {
        const commentData = {
            lines: { hit: 0, found: 0, percent: 0, diff: 0 },
            functions: { hit: 0, found: 0, percent: 0, diff: 0 },
            branches: { hit: 0, found: 0, percent: 0, diff: 0 },
        };
        const coverageData = await lcovParse(path);
        for (const i in coverageData) {
            commentData.lines.hit += coverageData[i].lines.hit;
            commentData.lines.found += coverageData[i].lines.found;
            commentData.functions.hit += coverageData[i].functions.hit;
            commentData.functions.found += coverageData[i].functions.found;
            commentData.branches.hit += coverageData[i].branches.hit;
            commentData.branches.found += coverageData[i].branches.found;
        }
        commentData.lines.percent = (commentData.lines.hit / commentData.lines.found) * 100;
        commentData.functions.percent = (commentData.functions.hit / commentData.functions.found) * 100;
        commentData.branches.percent = (commentData.branches.hit / commentData.branches.found) * 100;
        return commentData;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = getCoverage;
