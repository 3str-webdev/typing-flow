import { Cursor } from "./cursor";
import { Queue } from "./queue";
import { execute } from "../shared/lib/generator";
import { isTextNode } from "../shared/lib/node";
import type { TypingFlowConfig, TypingNode } from "../types";

export class TypingFlow<Elem extends HTMLElement = HTMLElement> {
	private _selector: string;
	private _container: Elem;

	private _nodesQueue: Queue<TypingNode> = new Queue();
	protected _typingQueue: Queue<TypingNode> = new Queue();
	protected _cursor = new Cursor<Queue<TypingNode>, TypingNode>(
		this._typingQueue,
	);

	private _nodeHandlers: Record<
		TypingNode["type"],
		(node: TypingNode) => void
	> = {
		clear: () => {},
		move: () => {},
		delete: () => {},
		text: () => {},
		tag: () => {},
		delay: () => {},
	};

	private _config: TypingFlowConfig<Elem> = {
		interval: 200,
		attr: "innerHTML",
	};

	constructor(selector: string, config: Partial<TypingFlowConfig<Elem>> = {}) {
		this._selector = selector;

		this.config(config);
	}

	private _movePtrLeft() {
		this._cursor.prevWhile((node) => {
			return !isTextNode(node);
		});
	}

	private _movePtrRight() {
		this._cursor.nextWhile((node) => {
			return node && !isTextNode(node);
		});
	}

	protected _render() {
		this._container[this._config.attr] = this._typingQueue
			.map((node) => {
				if ("value" in node) {
					return node.value;
				}
			})
			.join("") as Elem[keyof Elem];
	}

	private _addTypingNode(node: TypingNode): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				this._nodeHandlers[node.type](node);
				this._render();
				resolve();
			}, node.delay);
		});
	}

	private _registerClearHandler() {
		this._nodeHandlers.clear = (node) => {
			if (node.type !== "clear") return;

			this._container[this._config.attr] = "" as Elem[keyof Elem];
		};
	}

	private _registerMoveHandler() {
		this._nodeHandlers.move = (node) => {
			if (node.type !== "move") return;

			if (node.direction === "left") {
				this._movePtrLeft();
			}

			if (node.direction === "right") {
				this._movePtrRight();
			}
		};
	}

	private _registerDeleteHandler() {
		this._nodeHandlers.delete = (node) => {
			if (node.type !== "delete") return;

			if (node.direction === "left") {
				if (this._cursor.position === 0) return;

				this._cursor.prevWhile((node) => {
					return !["text", "tag"].includes(node.type);
				});
				this._typingQueue.delete(this._cursor.position);
			}

			if (node.direction === "right") {
				if (this._cursor.position < this._typingQueue.length) {
					this._typingQueue.delete(this._cursor.position);
				}

				// this._cursor.nextWhile((node) => {
				// 	return !["text", "tag"].includes(node.type);
				// });
			}
		};
	}

	private _registerTextHandler() {
		const handler = (node: TypingNode) => {
			if (node.type !== "text" && node.type !== "tag") return;

			this._typingQueue.insert(this._cursor.position, node);
			this._cursor.next();
			console.log(this._cursor.position);
		};

		this._nodeHandlers.text = handler;
		this._nodeHandlers.tag = handler;
	}

	private *_typing() {
		for (const node of this._nodesQueue) {
			yield this._addTypingNode(node);
		}
	}

	public config(config: Partial<TypingFlowConfig<Elem>>) {
		this._config = { ...this._config, ...config };

		return this;
	}

	public type(text: string) {
		for (let i = 0; i < text.length; i++) {
			this._nodesQueue.push({
				type: "text",
				value: text[i],
				delay: this._config.interval,
			});
		}

		return this;
	}

	public tag(tag: string) {
		this._nodesQueue.push({
			type: "tag",
			value: tag,
			delay: this._config.interval,
		});

		return this;
	}

	public delay(ms: number) {
		this._nodesQueue.push({ type: "delay", delay: ms });

		return this;
	}

	public clear() {
		this._nodesQueue.push({ type: "clear", delay: 0 });

		return this;
	}

	public moveCursor(delta: number, options: { instant?: boolean } = {}) {
		const direction = delta < 0 ? "left" : "right";
		const delay = options.instant ? 0 : this._config.interval;

		for (let i = 0; i < Math.abs(delta); i++) {
			this._nodesQueue.push({
				type: "move",
				delay,
				direction,
			});
		}

		return this;
	}

	public backspace(amount: number, options: { instant?: boolean } = {}) {
		const direction = "left";
		const delay = options.instant ? 0 : this._config.interval;

		for (let i = 0; i < amount; i++) {
			this._nodesQueue.push({
				type: "delete",
				delay,
				direction,
			});
		}

		return this;
	}

	public delete(amount: number, options: { instant?: boolean } = {}) {
		const direction = "right";
		const delay = options.instant ? 0 : this._config.interval;

		for (let i = 0; i < amount; i++) {
			this._nodesQueue.push({
				type: "delete",
				delay,
				direction,
			});
		}

		return this;
	}

	public start() {
		const container = document.querySelector(this._selector) as Elem | null;

		if (container === null) {
			throw new Error(
				`TypingFlowError: Container with selector '${this._selector}' not found`,
			);
		}

		this._container = container;

		this._registerClearHandler();
		this._registerMoveHandler();
		this._registerDeleteHandler();
		this._registerTextHandler();

		execute(this._typing());

		return this;
	}
}
