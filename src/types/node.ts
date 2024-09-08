type BaseTypingNode<Type extends string> = {
	type: Type;
	delay: number;
};

type TextTypingNode = BaseTypingNode<"text"> & {
	value: string;
};

type TagTypingNode = BaseTypingNode<"tag"> & {
	value: string;
};

type DelayTypingNode = BaseTypingNode<"delay">;

type ClearTypingNode = BaseTypingNode<"clear">;

type MoveTypingNode = BaseTypingNode<"move"> & {
	direction: "left" | "right" | "START" | "END";
};

type DeleteTypingNode = BaseTypingNode<"delete"> & {
	direction: "left" | "right";
};

export type TypingNode =
	| TextTypingNode
	| TagTypingNode
	| DelayTypingNode
	| ClearTypingNode
	| MoveTypingNode
	| DeleteTypingNode;

export type BaseNodeOptions = {
	interval?: number;
	delay?: number;
};

export type TextNodeOptions = BaseNodeOptions;
export type TagNodeOptions = BaseNodeOptions;
export type MoveNodeOptions = BaseNodeOptions & { instant?: boolean };
export type BackspaceNodeOptions = BaseNodeOptions & { instant?: boolean };
export type DeleteNodeOptions = BaseNodeOptions & { instant?: boolean };

export type MoveCursorDelta = number | "START" | "END";
