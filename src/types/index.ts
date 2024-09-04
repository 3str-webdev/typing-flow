export type TypingFlowConfig<Elem extends HTMLElement> = {
	interval: number;
	attr: keyof Elem;
};

export type RendererConfig = {
	mode: "default" | "lite";
	charClass: string[];
	charWithCursorClass: string[];
};

export * from "./node";
