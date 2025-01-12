import { TypingSnapshot } from "@/lib/shared/types";
import { BrowserRendererConfig } from "./renderer.types";

export function simpleBrowserRenderer({
  baseNodeClasses = ["typing-node"],
  nodeWithCursorClasses = ["typing-node_with-cursor"],
}: BrowserRendererConfig = {}) {
  return (rootContainer: HTMLElement, typingSnapshot: TypingSnapshot) => {
    rootContainer.innerHTML = "";

    console.log(typingSnapshot.content, typingSnapshot.cursorPosition);

    // add a zero-width space for correct render empty content with cursor
    if (typingSnapshot.content.length === 0) {
      typingSnapshot = {
        content: ["&#8203;"],
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
