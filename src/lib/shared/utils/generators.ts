const executeFn = <T>(
  generator: Generator<Promise<T>>,
  yieldValue?: unknown,
  onFinish?: () => void,
) => {
  const next = generator.next(yieldValue);

  if (!next.done) {
    next.value.then(
      (result) => executeFn(generator, result, onFinish),
      (err) => generator.throw(err),
    );
  } else {
    onFinish?.();
  }
};

export function execute<T>(
  generator: Generator<Promise<T>>,
  yieldValue?: unknown,
) {
  return new Promise<void>((resolve) => {
    executeFn(generator, yieldValue, resolve);
  });
}
