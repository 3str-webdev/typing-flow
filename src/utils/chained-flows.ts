import type { TypingFlow } from "@/models/typing-flow";

export const chainedFlows = (...flows: TypingFlow[]): TypingFlow => {
	for (let i = 0; i < flows.length - 1; i++) {
		const flow = flows[i];

		flow.config({ loop: false });
		flow.on("finish", flows[i + 1].start);
	}

	return flows[0];
};
