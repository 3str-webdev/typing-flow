export type TypingFlowConfig<Elem extends HTMLElement> = {
	interval: number;
	attr: keyof Elem;
	loop: boolean;
};

export type RendererConfig = {
	mode: "default" | "lite";
	charClass: string[];
	charWithCursorClass: string[];
};

export type TypingFlowHooks = {
	onStart: (() => void)[];
	onFinish: (() => void)[];
};

export type TypingFlowHooksAliases = "start" | "finish";

export * from "./node";
