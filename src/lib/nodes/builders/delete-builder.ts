import { CanBeArray } from "@/lib/shared/types";
import { DeleteTypingNode } from "../nodes.types";

export const del = (
  options: {
    amount?: number;
    delay?: number;
    instant?: boolean;
  } = {},
): CanBeArray<DeleteTypingNode> => {
  if (options.instant) {
    return {
      type: "delete",
      nodeBuilder: () => ({
        amount: options.amount ?? 1,
        delay: 0,
        instant: options.instant ?? false,
      }),
    };
  }

  return Array.from({ length: options.amount ?? 1 }, () => ({
    type: "delete",
    nodeBuilder: () => ({
      amount: 1,
      delay: options.delay,
      instant: options.instant ?? false,
    }),
  }));
};
