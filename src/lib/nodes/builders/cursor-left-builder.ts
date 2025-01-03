import { CanBeArray } from "@/lib/shared/types";
import { CursorMoveLeftTypingNode } from "../nodes.types";

export const cursorLeft = (
  distance: number,
  options: {
    delay?: number;
    instant?: boolean;
  } = {},
): CanBeArray<CursorMoveLeftTypingNode> => {
  if (options.instant) {
    return {
      type: "cursorMoveLeft",
      nodeBuilder: () => ({
        distance,
        delay: options.delay,
        instant: true,
      }),
    };
  }

  return Array.from({ length: distance }, () => ({
    type: "cursorMoveLeft",
    nodeBuilder: () => ({
      distance: 1,
      delay: options.delay,
      instant: false,
    }),
  }));
};
