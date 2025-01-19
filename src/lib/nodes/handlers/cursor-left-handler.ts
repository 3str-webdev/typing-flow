import { MIN_POSSIBLE_CURSOR_POSITION } from "@/lib/shared/constants";
import { TypingSnapshot } from "@/lib/shared/types";
import { CursorMoveLeftTypingNode } from "../nodes.types";

export function cursorMoveLeftTypingNodeHandler(
  node: CursorMoveLeftTypingNode,
  typingSnapshot: TypingSnapshot,
) {
  const buildedNode = node.nodeBuilder(typingSnapshot);

  typingSnapshot.cursorPosition = Math.max(
    typingSnapshot.cursorPosition - buildedNode.distance,
    MIN_POSSIBLE_CURSOR_POSITION,
  );
}
