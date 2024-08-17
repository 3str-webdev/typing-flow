export class Queue<T> extends Array<T> {
	public insert(index: number, node: T) {
		if (index < 0 || index > this.length) {
			throw new Error(`Index ${index} out of Queue ${this.length}`);
		}

		this.splice(index, 0, node);
	}

	public delete(index: number) {
		if (index < 0 || index >= this.length) {
			throw new Error(`Index ${index} out of Queue ${this.length}`);
		}

		this.splice(index, 1);
	}
}
