import { TypingFlow } from "./typing-flow/typing-flow";

export class Debugger<Elem extends HTMLElement> extends TypingFlow<Elem> {
	private _debugSelector: string;
	private _debugContainer: HTMLElement;

	constructor(selector: string, debugSelector: string) {
		super(selector);
		this._debugSelector = debugSelector;
	}

	_render() {
		this._debugContainer.innerHTML = "";

		for (let i = 0; i < this._typingQueue.length; i++) {
			const node = this._typingQueue[i];
			const withCursor = i === this._cursor.position;
			const nodeContainer = document.createElement("span");

			nodeContainer.classList.add("tf-debugger__node");

			if (withCursor) {
				nodeContainer.classList.add("tf-debugger__node--cursor");
			}

			if (node.type === "text" || node.type === "tag") {
				nodeContainer.textContent = node.value;
			}

			this._debugContainer.appendChild(nodeContainer);
		}

		const lastContainer = document.createElement("span");
		lastContainer.classList.add("tf-debugger__node");

		if (this._cursor.position === this._typingQueue.length) {
			lastContainer.classList.add("tf-debugger__node--cursor");
		}

		this._debugContainer.appendChild(lastContainer);
	}

	public start() {
		this._debugContainer = document.querySelector(
			this._debugSelector,
		) as HTMLElement;
		this._debugContainer.classList.add("tf-debugger");
		return super.start();
	}
}
