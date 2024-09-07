export function execute<T>(
	generator: Generator<Promise<T>>,
	yieldValue?: unknown,
) {
	const next = generator.next(yieldValue);

	if (!next.done) {
		next.value.then(
			(result) => execute(generator, result),
			(err) => generator.throw(err),
		);
	}
}
