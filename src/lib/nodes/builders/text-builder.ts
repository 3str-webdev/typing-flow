import { CanBeArray } from "@/lib/shared/types";
import { TextTypingNode } from "../nodes.types";

export const text = (
	text: string,
	options: {
		delay?: number;
		instant?: boolean;
	} = {},
): CanBeArray<TextTypingNode> => {
	return text.split("").map((char) => {
		return {
			type: "text",
			nodeBuilder: (rootContainer) => ({
				text: char,
				delay: options.instant ? 0 : options.delay,
				instant: options.instant ?? false,
				container: rootContainer,
			}),
		};
	});
};
