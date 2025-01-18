import { TypingSnapshot } from "@/lib/shared/types";
import { getTypingSnapshotIndexData } from "@/lib/shared/utils/typing-snapshot";
import { DeleteTypingNode } from "../nodes.types";
import { isTagString } from "@/lib/shared/utils/browser";
import { MIN_POSSIBLE_CURSOR_POSITION } from "@/lib/shared/constants";

export function deleteTypingNodeHandler(
  node: DeleteTypingNode,
  typingSnapshot: TypingSnapshot,
  rootContainer: HTMLElement,
) {
  if (typingSnapshot.cursorPosition < MIN_POSSIBLE_CURSOR_POSITION) return;

  const buildedNode = node.nodeBuilder(rootContainer, typingSnapshot);

  const { indexOfSymbolWithCursor } =
    getTypingSnapshotIndexData(typingSnapshot);

  let amountOfDeletedSymbols = 0;
  let tagsIndexDifferent = 0;

  while (amountOfDeletedSymbols < buildedNode.amount) {
    const deleteTargetIndex = indexOfSymbolWithCursor + tagsIndexDifferent + 1;

    if (deleteTargetIndex >= typingSnapshot.content.length) {
      break;
    }

    const deleteTarget = typingSnapshot.content[deleteTargetIndex];

    if (isTagString(deleteTarget)) {
      tagsIndexDifferent++;
      continue;
    }

    typingSnapshot.content.splice(deleteTargetIndex, 1);
    amountOfDeletedSymbols++;
  }
}
