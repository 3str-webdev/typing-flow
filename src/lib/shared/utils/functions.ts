export const callArrayOfFunctions = <T extends (...args: any) => any>(
  functions: T[],
  ...sharedArgs: Parameters<T>
) => {
  for (const fn of functions) {
    fn(...sharedArgs);
  }
};
