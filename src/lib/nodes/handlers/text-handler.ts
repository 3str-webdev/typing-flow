import { TypingSnapshot } from "@/lib/shared/types";
import { TextTypingNode } from "../nodes.types";
import { getTypingSnapshotIndexData } from "@/lib/shared/utils/typing-snapshot";
import { MIN_POSSIBLE_CURSOR_POSITION } from "@/lib/shared/constants";

export function textTypingNodeHandler(
  node: TextTypingNode,
  typingSnapshot: TypingSnapshot,
) {
  const buildedNode = node.nodeBuilder(typingSnapshot);

  const { indexOfSymbolWithCursor } =
    getTypingSnapshotIndexData(typingSnapshot);

  if (
    buildedNode.isTag &&
    indexOfSymbolWithCursor === MIN_POSSIBLE_CURSOR_POSITION
  ) {
    typingSnapshot.content.push(buildedNode.text);
    return;
  }

  typingSnapshot.content.splice(
    indexOfSymbolWithCursor + 1,
    0,
    buildedNode.text,
  );

  if (!buildedNode.isTag) {
    typingSnapshot.cursorPosition += 1;
  }
}
