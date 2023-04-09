import { Presets, SingleBar } from 'cli-progress';

export const useThread = <T>(
  threadFuncs: (() => Promise<T>)[],
  maxThread: number
): Promise<T[]> => {
  const progressBar = new SingleBar({}, Presets.shades_classic);

  const histories: number[] = [];
  const results: T[] = [];

  return new Promise((resolve) => {
    const dispatchThread = () => {
      threadFuncs.forEach(async (threadFunc, i) => {
        if (i >= results.length + maxThread) return;
        if (histories.includes(i)) return;

        histories.push(i);
        results.push(await threadFunc());
        progressBar.update(results.length);
        dispatchThread();
        if (results.length === threadFuncs.length) {
          progressBar.stop();
          resolve(results);
        }
      });
    };
    progressBar.start(threadFuncs.length, 0);
    dispatchThread();
  });
};
