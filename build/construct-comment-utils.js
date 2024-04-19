"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoverageAfterPr = exports.getCoverageEmoji = exports.getCoverageDifferenceEmoji = void 0;
const getCoverageEmoji = (coverage) => {
    if (coverage === 100) {
        return ':100:';
    }
    else if (coverage >= 90) {
        return '🥇';
    }
    else if (coverage >= 80) {
        return '🥈';
    }
    else if (coverage >= 70) {
        return '🥉';
    }
    else {
        return '😔';
    }
};
exports.getCoverageEmoji = getCoverageEmoji;
const getCoverageDifferenceEmoji = (coverageDifference) => {
    if (coverageDifference > 0) {
        return '😀';
    }
    else if (coverageDifference === 0) {
        return '🙂';
    }
    else if (coverageDifference < 0 && coverageDifference > -5) {
        return '😐';
    }
    else if (coverageDifference <= -5 && coverageDifference > -10) {
        return '😕';
    }
    else {
        return '🥴';
    }
};
exports.getCoverageDifferenceEmoji = getCoverageDifferenceEmoji;
const getCoverageIncreaseOrDecreaseSign = (difference) => {
    if (difference > 0) {
        return `+${(Math.round(difference * 100) / 100).toString()}%`;
    }
    return `${(Math.round(difference * 100) / 100).toString()}%`;
};
const getCoverageAfterPr = (current, difference) => {
    const newCoverage = Math.round((current + difference) * 100) / 100;
    return `${newCoverage.toString()}% (${getCoverageIncreaseOrDecreaseSign(difference)})`;
};
exports.getCoverageAfterPr = getCoverageAfterPr;
