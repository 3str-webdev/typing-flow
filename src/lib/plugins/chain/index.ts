import { TypingFlow } from "@/lib/core";

export const chain = (...flows: TypingFlow[]) => {
  if (flows.length < 1) {
    return null;
  }

  for (let i = 0; i < flows.length - 1; i++) {
    const flow = flows[i];
    const nextFlow = flows[i + 1];

    flow.on("finish", () => {
      nextFlow.start();
    });
  }

  return flows[0];
};
