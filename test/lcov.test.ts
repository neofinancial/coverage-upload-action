import getCoverage from '../src/get-coverage';

describe('getCoverage tests', () => {
  test('should throw error', async () => {
    await expect(getCoverage('')).rejects.toThrow();
  });
});
