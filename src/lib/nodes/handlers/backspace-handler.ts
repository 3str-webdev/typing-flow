import { TypingSnapshot } from "@/lib/shared/types";
import { isTagString } from "@/lib/shared/utils/browser";
import { BackspaceTypingNode } from "../nodes.types";
import { getTypingSnapshotIndexData } from "@/lib/shared/utils/typing-snapshot";

export function backspaceTypingNodeHandler(
  node: BackspaceTypingNode,
  typingSnapshot: TypingSnapshot,
  rootContainer: HTMLElement,
) {
  if (typingSnapshot.cursorPosition < 0) return;

  const buildedNode = node.nodeBuilder(rootContainer, typingSnapshot);

  let amountOfDeletedSymbols = 0;

  const { amountOfNonTagSymbols, indexOfSymbolWithCursor } =
    getTypingSnapshotIndexData(typingSnapshot);

  const amountOfPossibleToBackspace = Math.min(
    buildedNode.amount,
    amountOfNonTagSymbols,
  );

  if (amountOfPossibleToBackspace === 0) {
    return;
  }

  for (let i = 0; amountOfDeletedSymbols < amountOfPossibleToBackspace; i++) {
    const backspaceTargetIndex = indexOfSymbolWithCursor - i;

    if (backspaceTargetIndex < 0) {
      break;
    }

    const backspaceTarget = typingSnapshot.content[backspaceTargetIndex];

    if (isTagString(backspaceTarget)) {
      continue;
    }

    typingSnapshot.content.splice(backspaceTargetIndex, 1);
    amountOfDeletedSymbols++;
  }

  typingSnapshot.cursorPosition -= amountOfDeletedSymbols;
}
