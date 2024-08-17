export type TypingFlowConfig<Elem extends HTMLElement> = {
	interval: number;
	attr: keyof Elem;
};

export * from "./node";
