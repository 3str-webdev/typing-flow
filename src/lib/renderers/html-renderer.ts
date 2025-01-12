import { TypingSnapshot } from "@/lib/shared/types";
import { typingFlowDOMParser } from "../shared/utils/browser";
import { BrowserRendererConfig } from "./renderer.types";

export function unstable_htmlRenderer({
  baseNodeClasses = ["typing-node"],
  nodeWithCursorClasses = ["typing-node_with-cursor"],
}: BrowserRendererConfig = {}) {
  return (rootContainer: HTMLElement, typingSnapshot: TypingSnapshot) => {
    let currentCharIndex = 0;

    rootContainer.innerHTML = "";

    console.log(typingSnapshot.content, typingSnapshot.cursorPosition);

    const recursiveRender = (browserNode: HTMLElement) => {
      console.log(browserNode);

      if (browserNode.nodeType === Node.TEXT_NODE) {
        const textContent = browserNode.textContent;
        const wrappedChars: Node[] = [];

        for (let i = 0; i < textContent.length; i++) {
          const char = textContent[i];
          const htmlWrapper = document.createElement("span");

          htmlWrapper.innerHTML = char;

          // it's important for correct render "space" symbols
          htmlWrapper.style.whiteSpace = "pre";

          htmlWrapper.setAttribute("data-tf-node", "");

          if (typingSnapshot.cursorPosition === currentCharIndex) {
            htmlWrapper.classList.add(...nodeWithCursorClasses);
          } else {
            htmlWrapper.classList.add(...baseNodeClasses);
          }

          currentCharIndex += char.length;
          wrappedChars.push(htmlWrapper);
        }

        for (const char of wrappedChars) {
          browserNode.parentNode.insertBefore(char, browserNode);
        }
        browserNode.parentNode.removeChild(browserNode);
      }

      if (browserNode.nodeType === Node.ELEMENT_NODE) {
        if (browserNode.hasAttribute("data-tf-node")) return;

        for (const childNode of browserNode.childNodes) {
          recursiveRender(childNode as HTMLElement);
        }
      }
    };

    console.log(typingSnapshot.content.join(""));
    const dom = (
      typingFlowDOMParser
        .parseFromString(typingSnapshot.content.join(""), "text/html")
        .cloneNode(true) as Document
    ).body;

    recursiveRender(dom);

    dom.style.display = "contents";

    rootContainer.appendChild(dom);

    console.log("-".repeat(100));
  };
}
