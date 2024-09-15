import { Cursor } from "@/models/cursor";
import { Queue } from "@/models/queue";
import { choiceFirstTruthful } from "@/shared/lib/helpers";
import type {
	BackspaceNodeOptions,
	BaseNodeOptions,
	DeleteNodeOptions,
	MoveCursorDelta,
	MoveNodeOptions,
	TagNodeOptions,
	TextNodeOptions,
	TypingFlowConfig,
	TypingNode,
} from "@/types";

export class TypingFlowBase<Elem extends HTMLElement = HTMLElement> {
	protected _nodesQueue: Queue<TypingNode> = new Queue();
	protected _typingQueue: Queue<TypingNode> = new Queue();
	protected _cursor = new Cursor<Queue<TypingNode>, TypingNode>(
		this._typingQueue,
	);

	private _nodeOptionsMiddleware = <T extends BaseNodeOptions>(
		options: T,
		cb: (options: T) => void,
	) => {
		if (options.delay) {
			this.delay(options.delay);
		}

		cb({ ...options, interval: options.interval || this._config.interval });
	};

	protected _config: TypingFlowConfig<Elem> = {
		interval: 200,
		attr: "innerHTML",
		loop: false,
	};

	constructor(config: Partial<TypingFlowConfig<Elem>> = {}) {
		this.config(config);
	}

	public config(config: Partial<TypingFlowConfig<Elem>>) {
		this._config = { ...this._config, ...config };

		return this;
	}

	public type(text: string, options: TextNodeOptions = {}) {
		this._nodeOptionsMiddleware(options, (computedOptions) => {
			for (let i = 0; i < text.length; i++) {
				this._nodesQueue.push({
					type: "text",
					value: text[i],
					delay: computedOptions.interval,
				});
			}
		});

		return this;
	}

	public tag(tag: string, options: TagNodeOptions = {}) {
		this._nodeOptionsMiddleware(options, (computedOptions) => {
			this._nodesQueue.push({
				type: "tag",
				value: tag,
				delay: computedOptions.interval,
			});
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

	public moveCursor(delta: MoveCursorDelta, options: MoveNodeOptions = {}) {
		this._nodeOptionsMiddleware(options, (computedOptions) => {
			let direction: "left" | "right" | "START" | "END" = "left";
			let numericDelta = 1;

			if (typeof delta === "number") {
				numericDelta = delta;
				direction = delta < 0 ? "left" : "right";
			} else {
				direction = delta;
			}

			const delay = choiceFirstTruthful(
				[options.instant, 0],
				computedOptions.interval,
			);

			for (let i = 0; i < Math.abs(numericDelta); i++) {
				this._nodesQueue.push({
					type: "move",
					delay,
					direction,
				});
			}
		});

		return this;
	}

	public backspace(
		amount: number | "START",
		options: BackspaceNodeOptions = {},
	) {
		this._nodeOptionsMiddleware(options, (computedOptions) => {
			const direction = amount === "START" ? "START" : "left";
			let numericAmount = 1;

			const delay = choiceFirstTruthful(
				[options.instant, 0],
				computedOptions.interval,
			);

			if (amount !== "START") {
				numericAmount = amount;
			}

			for (let i = 0; i < numericAmount; i++) {
				this._nodesQueue.push({
					type: "delete",
					delay,
					direction,
				});
			}
		});

		return this;
	}

	public delete(amount: number | "END", options: DeleteNodeOptions = {}) {
		this._nodeOptionsMiddleware(options, (computedOptions) => {
			const direction = amount === "END" ? "END" : "right";
			let numericAmount = 1;

			const delay = choiceFirstTruthful(
				[options.instant, 0],
				computedOptions.interval,
			);

			if (amount !== "END") {
				numericAmount = amount;
			}

			for (let i = 0; i < numericAmount; i++) {
				this._nodesQueue.push({
					type: "delete",
					delay,
					direction,
				});
			}
		});

		return this;
	}
}
