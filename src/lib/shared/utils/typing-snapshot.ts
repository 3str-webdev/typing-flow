import { MIN_POSSIBLE_CURSOR_POSITION } from "../constants";
import { TypingSnapshot } from "../types";
import { isTagString } from "./browser";

type TypingSnapshotIndexData = {
  indexOfSymbolWithCursor: number;
  lastNonTagSymbolIndex: number;
  amountOfNonTagSymbols: number;
};

export const getTypingSnapshotIndexData = (
  typingSnapshot: TypingSnapshot,
): TypingSnapshotIndexData => {
  const result: TypingSnapshotIndexData = {
    indexOfSymbolWithCursor: MIN_POSSIBLE_CURSOR_POSITION,
    lastNonTagSymbolIndex: null,
    amountOfNonTagSymbols: 0,
  };

  for (let i = 0; i < typingSnapshot.content.length; i++) {
    const currentSymbol = typingSnapshot.content[i];

    if (!isTagString(currentSymbol)) {
      ++result.amountOfNonTagSymbols;
      result.lastNonTagSymbolIndex = i;
    }

    if (result.amountOfNonTagSymbols === typingSnapshot.cursorPosition + 1) {
      result.indexOfSymbolWithCursor = i;
    }
  }

  if (typingSnapshot.cursorPosition < 0) {
    result.indexOfSymbolWithCursor = MIN_POSSIBLE_CURSOR_POSITION;
  }

  return result;
};
