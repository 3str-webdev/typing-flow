import { TypingSnapshot } from "@/lib/shared/types";
import { BrowserRendererConfig } from "./renderer.types";
import {
  MIN_POSSIBLE_CURSOR_POSITION,
  ZERO_WIDTH_SPACE,
} from "../shared/constants";

export function simpleBrowserRenderer({
  baseNodeClasses = ["typing-node"],
  nodeWithCursorClasses = ["typing-node_with-cursor"],
}: BrowserRendererConfig = {}) {
  return (rootContainer: HTMLElement, typingSnapshot: TypingSnapshot) => {
    rootContainer.innerHTML = "";

    // add a zero-width space for correct render empty content with cursor
    if (typingSnapshot.cursorPosition === MIN_POSSIBLE_CURSOR_POSITION) {
      typingSnapshot = {
        content: [ZERO_WIDTH_SPACE, ...typingSnapshot.content],
        cursorPosition: 0,
      };
    }

    for (let i = 0; i < typingSnapshot.content.length; i++) {
      const htmlWrapper = document.createElement("span");
      const char = typingSnapshot.content[i];

      htmlWrapper.innerHTML = char;

      // it's important for correct render "space" symbols
      htmlWrapper.style.whiteSpace = "pre";

      if (typingSnapshot.cursorPosition === i) {
        htmlWrapper.classList.add(...nodeWithCursorClasses);
      } else {
        htmlWrapper.classList.add(...baseNodeClasses);
      }

      rootContainer.appendChild(htmlWrapper);
    }
  };
}
