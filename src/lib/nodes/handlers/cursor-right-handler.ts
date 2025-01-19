import { TypingSnapshot } from "@/lib/shared/types";
import { CursorMoveRightTypingNode } from "../nodes.types";
import { getTypingSnapshotIndexData } from "@/lib/shared/utils/typing-snapshot";
import { isTagString } from "@/lib/shared/utils/browser";

export function cursorMoveRightTypingNodeHandler(
  node: CursorMoveRightTypingNode,
  typingSnapshot: TypingSnapshot,
) {
  const buildedNode = node.nodeBuilder(typingSnapshot);

  const { indexOfSymbolWithCursor } =
    getTypingSnapshotIndexData(typingSnapshot);

  let amountOfPassedSymbols = 0;

  for (
    let i = indexOfSymbolWithCursor + 1;
    i < typingSnapshot.content.length;
    i++
  ) {
    const currentSymbol = typingSnapshot.content[i];

    if (isTagString(currentSymbol)) {
      continue;
    }

    if (amountOfPassedSymbols >= buildedNode.distance) {
      break;
    }

    amountOfPassedSymbols++;
    typingSnapshot.cursorPosition++;
  }
}
