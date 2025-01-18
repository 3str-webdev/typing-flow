import { TypingSnapshot } from "@/lib/shared/types";
import { getTypingSnapshotIndexData } from "@/lib/shared/utils/typing-snapshot";

export function endTypingNodeHandler(typingSnapshot: TypingSnapshot) {
  const { amountOfNonTagSymbols } = getTypingSnapshotIndexData(typingSnapshot);

  typingSnapshot.cursorPosition = amountOfNonTagSymbols - 1;
}
