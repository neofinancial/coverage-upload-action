const getCoverageEmoji = (coverage: number): string => {
  if (coverage === 100) {
    return ':100:';
  } else if (coverage >= 90) {
    return '🥇';
  } else if (coverage >= 80) {
    return '🥈';
  } else if (coverage >= 70) {
    return '🥉';
  } else {
    return '😔';
  }
};

const getCoverageDifferenceEmoji = (coverageDifference: number): string => {
  if (coverageDifference > 0) {
    return '😀';
  } else if (coverageDifference === 0) {
    return '🙂';
  } else if (coverageDifference < 0 && coverageDifference > -5) {
    return '😐';
  } else if (coverageDifference <= -5 && coverageDifference > -10) {
    return '😕';
  } else {
    return '🥴';
  }
};

const getCoverageIncreaseOrDecreaseSign = (difference: number): string => {
  if (difference > 0) {
    return `+${(Math.round(difference * 100) / 100).toString()}%`;
  }

  return `${(Math.round(difference * 100) / 100).toString()}%`;
};

const getCoverageAfterPr = (current: number, difference: number): string => {
  const newCoverage = Math.round((current + difference) * 100) / 100;

  return `${newCoverage.toString()}% (${getCoverageIncreaseOrDecreaseSign(difference)})`;
};

export { getCoverageDifferenceEmoji, getCoverageEmoji, getCoverageAfterPr };
