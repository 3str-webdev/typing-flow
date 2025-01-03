import { CanBeArray } from "@/lib/shared/types";
import { BackspaceTypingNode } from "../nodes.types";

export const backspace = (
	options: {
		amount?: number;
		delay?: number;
		instant?: boolean;
	} = {},
): CanBeArray<BackspaceTypingNode> => {
	if (options.instant) {
		return {
			type: "backspace",
			nodeBuilder: () => ({
				amount: options.amount ?? 1,
				delay: 0,
				instant: options.instant ?? false,
			}),
		};
	}

	return Array.from({ length: options.amount ?? 1 }, () => ({
		type: "backspace",
		nodeBuilder: () => ({
			amount: 1,
			delay: options.delay,
			instant: options.instant ?? false,
		}),
	}));
};
