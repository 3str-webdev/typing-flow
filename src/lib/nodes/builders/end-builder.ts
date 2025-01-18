import { EndTypingNode } from "../nodes.types";

export const end = (): EndTypingNode => {
  return {
    type: "end",
    nodeBuilder: () => ({ delay: 0 }),
  };
};
