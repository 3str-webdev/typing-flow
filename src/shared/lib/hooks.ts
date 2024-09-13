import type { TypingFlowHooks, TypingFlowHooksAliases } from "@/types";

export const hooksAliasesMap: Record<
	TypingFlowHooksAliases,
	keyof TypingFlowHooks
> = {
	start: "onStart",
	finish: "onFinish",
};
