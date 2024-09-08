import { Cursor } from "@/models/cursor";
import { Queue } from "@/models/queue";
import { choiceFirstTruthful } from "@/shared/lib/helpers";
import type {
	BackspaceNodeOptions,
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

	protected _config: TypingFlowConfig<Elem> = {
		interval: 200,
		attr: "innerHTML",
	};

	constructor(config: Partial<TypingFlowConfig<Elem>> = {}) {
		this.config(config);
	}

	public config(config: Partial<TypingFlowConfig<Elem>>) {
		this._config = { ...this._config, ...config };

		return this;
	}

	public type(text: string, options: TextNodeOptions = {}) {
		for (let i = 0; i < text.length; i++) {
			this._nodesQueue.push({
				type: "text",
				value: text[i],
				delay: options.interval || this._config.interval,
			});
		}

		return this;
	}

	public tag(tag: string, options: TagNodeOptions = {}) {
		this._nodesQueue.push({
			type: "tag",
			value: tag,
			delay: options.interval || this._config.interval,
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
			options.interval,
			this._config.interval,
		);

		for (let i = 0; i < Math.abs(numericDelta); i++) {
			this._nodesQueue.push({
				type: "move",
				delay,
				direction,
			});
		}

		return this;
	}

	public backspace(amount: number, options: BackspaceNodeOptions = {}) {
		const direction = "left";
		const delay = choiceFirstTruthful(
			[options.instant, 0],
			options.interval,
			this._config.interval,
		);

		for (let i = 0; i < amount; i++) {
			this._nodesQueue.push({
				type: "delete",
				delay,
				direction,
			});
		}

		return this;
	}

	public delete(amount: number, options: DeleteNodeOptions = {}) {
		const direction = "right";
		const delay = choiceFirstTruthful(
			[options.instant, 0],
			options.interval,
			this._config.interval,
		);

		for (let i = 0; i < amount; i++) {
			this._nodesQueue.push({
				type: "delete",
				delay,
				direction,
			});
		}

		return this;
	}
}
