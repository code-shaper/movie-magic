import path from 'path';
import { FileUtils } from '@code-shaper/shaper-utils';
import { fetchHookGenerator } from './index';

describe('fetchHookGenerator', () => {
  test('should create a new fetchHook from templates', async () => {
    // suppress console logs
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'log').mockImplementation(() => {});

    // Delete test-output if it exists
    const testOutput = path.join(__dirname, 'test-output');
    FileUtils.deletePath(testOutput);

    // Run the generator
    await fetchHookGenerator.generate(testOutput, {
      itemName: 'Movies',
      returnType: 'Movie[]',
      parentDir: path.join(testOutput),
    });

    // Compare test-output with expected-output
    const expectedOutput = path.join(__dirname, 'expected-output');
    const result = FileUtils.compareDirectories(expectedOutput, testOutput);
    expect(result.same).toBe(true);

    // restore console logs
    jest.restoreAllMocks();
  });
});
