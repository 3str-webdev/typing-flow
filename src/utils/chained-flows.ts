import type { TypingFlow } from "@/models/typing-flow";

export const chainedFlows = (...flows: TypingFlow[]): TypingFlow | null => {
	if (flows.length === 0) {
		return null;
	}

	for (let i = 0; i < flows.length - 1; i++) {
		const flow = flows[i];

		flow.config({ loop: false });
		flow.on("finish", flows[i + 1].start);
	}

	flows[flows.length - 1].config({ loop: false });

	return flows[0];
};
