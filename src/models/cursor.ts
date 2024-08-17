export class Cursor<C extends { length: number }, T> {
	private _position = 0;
	private _collection: C;

	constructor(collection: C) {
		this._collection = collection;
	}

	public next() {
		this._position = Math.min(this._collection.length, this._position + 1);
	}

	public prev() {
		this._position = Math.max(0, this._position - 1);
	}

	public prevWhile(checkFn: (value: T, index: number) => boolean) {
		do {
			this.prev();
		} while (
			checkFn(this._collection[this._position], this._position) &&
			this._position > 0
		);
	}

	public nextWhile(checkFn: (value: T, index: number) => boolean) {
		do {
			this.next();
		} while (
			checkFn(this._collection[this._position], this._position) &&
			this._position < this._collection.length
		);
	}

	public get position() {
		return this._position;
	}
}
