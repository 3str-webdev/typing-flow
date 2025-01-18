import { MIN_POSSIBLE_CURSOR_POSITION } from "@/lib/shared/constants";
import { TypingSnapshot } from "@/lib/shared/types";

export function homeTypingNodeHandler(typingSnapshot: TypingSnapshot) {
  typingSnapshot.cursorPosition = MIN_POSSIBLE_CURSOR_POSITION;
}
