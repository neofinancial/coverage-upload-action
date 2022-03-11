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

  const testDiff = 3.5322134

  if (testDiff>0) {
    return `+${(Math.round(testDiff * 100) / 100).toString()}%`;
  }

  return `${(Math.round(testDiff * 100) / 100).toString()}%`;
};

export { getCoverageDifferenceEmoji, getCoverageEmoji, getCoverageIncreaseOrDecreaseSign };
