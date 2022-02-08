import constructComment from '../src/construct-comment';

const mockLines = {
  hit: 0,
  found: 0,
  percent: 0,
  diff: 0,
};

const mockFunctions = {
  hit: 0,
  found: 0,
  percent: 0,
  diff: 0,
};

const mockBranches = {
  hit: 0,
  found: 0,
  percent: 0,
  diff: 0,
};

const mockData = {
  lines: mockLines,
  functions: mockFunctions,
  branches: mockBranches,
};

test('Should have a hidden coverage action comment line inside message', async (): Promise<void> => {
  const result = await constructComment(mockData);

  expect(result).toContain('<!-- coverage-action-comment -->');
});
