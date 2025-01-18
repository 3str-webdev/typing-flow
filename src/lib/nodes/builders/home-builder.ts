import { HomeTypingNode } from "../nodes.types";

export const home = (): HomeTypingNode => {
  return {
    type: "home",
    nodeBuilder: () => ({ delay: 0 }),
  };
};
