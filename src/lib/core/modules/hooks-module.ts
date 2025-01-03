import { TYPING_HOOKS_MAP } from "@/lib/shared/constants/hooks";
import { PossibleHooks } from "@/lib/shared/types";

export class HooksModule {
	protected _hooks: Record<PossibleHooks, (() => void)[]> = {
		onStart: [],
		onFinish: [],
	};

	public on(hookAlias: keyof typeof TYPING_HOOKS_MAP, fn: () => void) {
		this._hooks[TYPING_HOOKS_MAP[hookAlias]].push(fn);
		return this;
	}

	public get hooks() {
		return this._hooks;
	}
}
