import { addManyClasses } from "@/shared/lib/helpers";
import type { RendererConfig, TypingNode } from "@/types";
import type { Cursor } from "./cursor";
import type { Queue } from "./queue";

type DefaultRenderOptions = {
	container: HTMLElement;
	queue: Queue<TypingNode>;
	cursor: Cursor<Queue<TypingNode>, TypingNode>;
};

type LiteRenderOptions = {
	container: HTMLElement;
	queue: Queue<TypingNode>;
};

type RenderOptions = DefaultRenderOptions & LiteRenderOptions;

export class Renderer {
	private _config: RendererConfig = {
		mode: "default",
		charClass: [],
		charWithCursorClass: [],
	};

	constructor(config: Partial<RendererConfig> = {}) {
		this._config = {
			...this._config,
			...config,
		};
	}

	private _createCharElement = (options: {
		value: string;
		withCursor: boolean;
	}) => {
		const charHtmlNode = document.createElement("span");

		addManyClasses(
			charHtmlNode,
			["tf-node__char"].concat(this._config.charClass),
		);

		if (options.withCursor) {
			addManyClasses(
				charHtmlNode,
				["tf-node__char--cursor"].concat(this._config.charWithCursorClass),
			);
		}

		if (options.value === " ") {
			charHtmlNode.innerHTML = "&nbsp;";
		} else {
			charHtmlNode.innerHTML = options.value;
		}

		return charHtmlNode;
	};

	private _defaultRender = ({
		container,
		queue,
		cursor,
	}: DefaultRenderOptions) => {
		container.innerHTML = "";

		for (let i = 0; i < queue.length; i++) {
			const node = queue[i];

			if (node.type !== "text" && node.type !== "tag") {
				continue;
			}

			const value = node.value;

			const withCursor = i === cursor.position;

			if (node.type === "tag") {
				container.innerHTML += value;
			} else {
				const charHtmlNode = this._createCharElement({
					value,
					withCursor,
				});

				container.appendChild(charHtmlNode);
			}
		}

		const tailHiddenElement = this._createCharElement({
			value: "",
			withCursor: cursor.position === queue.length,
		});

		container.appendChild(tailHiddenElement);
	};

	private _liteRender = ({ container, queue }: LiteRenderOptions) => {
		container.innerHTML = queue
			.map((node) => {
				if ("value" in node) {
					return node.value;
				}
			})
			.join("");
	};

	public render(options: RenderOptions) {
		if (this._config.mode === "lite") {
			this._liteRender(options);
		} else {
			this._defaultRender(options);
		}
	}
}
