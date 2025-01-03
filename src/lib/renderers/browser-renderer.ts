import { TypingSnapshot } from "@/lib/shared/types";
import { BrowserRendererConfig } from "./renderer.types";

export function browserRenderer({
  baseNodeClasses = ["typing-node"],
  nodeWithCursorClasses = ["typing-node_with-cursor"],
}: BrowserRendererConfig = {}) {
  return (container: HTMLElement, typingSnapshot: TypingSnapshot) => {
    container.innerHTML = "";

    // add a zero-width space for correct render cursor with empty content
    if (typingSnapshot.content.length === 0) {
      typingSnapshot = {
        content: ["&#8203;"],
        cursorPosition: 0,
      };
    }

    for (let i = 0; i < typingSnapshot.content.length; i++) {
      const htmlWrapper = document.createElement("span");

      htmlWrapper.innerHTML = typingSnapshot.content[i];

      // it's important for correct render "space" symbols
      htmlWrapper.style.whiteSpace = "pre";

      if (typingSnapshot.cursorPosition === i) {
        htmlWrapper.classList.add(...nodeWithCursorClasses);
      } else {
        htmlWrapper.classList.add(...baseNodeClasses);
      }

      container.appendChild(htmlWrapper);
    }
  };
}
