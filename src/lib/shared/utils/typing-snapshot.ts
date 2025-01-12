import { TypingSnapshot } from "../types";
import { isTagString } from "./browser";

export const getTypingSnapshotIndexData = (typingSnapshot: TypingSnapshot) => {
  let amountOfNonTagSymbols = 0;

  if (typingSnapshot.cursorPosition < 0)
    return {
      indexOfSymbolWithCursor: -1,
      amountOfNonTagSymbols: 0,
    };

  for (let i = 0; i < typingSnapshot.content.length; i++) {
    const currentSymbol = typingSnapshot.content[i];

    if (!isTagString(currentSymbol)) {
      ++amountOfNonTagSymbols;
    }

    if (amountOfNonTagSymbols === typingSnapshot.cursorPosition + 1) {
      return {
        indexOfSymbolWithCursor: i,
        amountOfNonTagSymbols,
      };
    }
  }

  return {
    indexOfSymbolWithCursor: -1,
    amountOfNonTagSymbols: 0,
  };
};
