import { CanBeArray } from "@/lib/shared/types";
import { CursorMoveRightTypingNode } from "../nodes.types";

export const cursorRight = (
  distance: number,
  options: {
    delay?: number;
    instant?: boolean;
  } = {},
): CanBeArray<CursorMoveRightTypingNode> => {
  if (options.instant) {
    return {
      type: "cursorMoveRight",
      nodeBuilder: () => ({
        distance,
        delay: 0,
        instant: options.instant ?? false,
      }),
    };
  }

  return Array.from({ length: distance }, () => ({
    type: "cursorMoveRight",
    nodeBuilder: () => ({
      distance: 1,
      delay: options.delay,
      instant: options.instant ?? false,
    }),
  }));
};
