import { Renderer } from "@/models/renderer";
import { execute } from "@/shared/lib/generator";
import { isTextNode } from "@/shared/lib/node";
import type { RendererConfig, TypingFlowConfig, TypingNode } from "@/types";
import { TypingFlowBase } from "./typing-flow-base";

export class TypingFlow<
	Elem extends HTMLElement = HTMLElement,
> extends TypingFlowBase<Elem> {
	private _selector: string;
	private _container: Elem;

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

	private _renderer: Renderer;

	constructor(
		selector: string,
		config: Partial<TypingFlowConfig<Elem> & RendererConfig> = {},
	) {
		const { mode, charClass, charWithCursorClass, ...typingConfig } = config;

		super(typingConfig);

		this._selector = selector;

		this._renderer = new Renderer({
			mode,
			charClass,
			charWithCursorClass,
		});

		this.config(typingConfig);
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

	private _handleTypingNode(node: TypingNode): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				this._nodeHandlers[node.type](node);

				this._renderer.render({
					container: this._container,
					queue: this._typingQueue,
					cursor: this._cursor,
				});

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
			}
		};
	}

	private _registerTextHandler() {
		const handler = (node: TypingNode) => {
			if (node.type !== "text" && node.type !== "tag") return;

			this._typingQueue.insert(this._cursor.position, node);
			this._cursor.next();
		};

		this._nodeHandlers.text = handler;
		this._nodeHandlers.tag = handler;
	}

	private *_typing() {
		for (const node of this._nodesQueue) {
			yield this._handleTypingNode(node);
		}
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
