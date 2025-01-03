import { DelayTypingNode } from "../nodes.types";

export const delay = (delay: number): DelayTypingNode => ({
  type: "delay",
  nodeBuilder: () => ({
    delay,
  }),
});
