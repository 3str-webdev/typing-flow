import { TypingFlowError } from "@/lib/shared/errors";
import { RendererType, TypingSnapshot } from "@/lib/shared/types";
import { typingFlowDOMParser } from "@/lib/shared/utils/browser";
import {
  MIN_POSSIBLE_CURSOR_POSITION,
  ZERO_WIDTH_SPACE,
} from "../shared/constants";
import { HtmlRendererConfig } from "./renderer.types";

export function unstable_htmlRenderer({
  selector,
  baseNodeClasses = ["typing-node"],
  nodeWithCursorClasses = ["typing-node_with-cursor"],
}: HtmlRendererConfig): RendererType {
  const rootContainer = document.querySelector(selector) as HTMLElement;

  if (!rootContainer) {
    throw TypingFlowError.ContainerNotFoundException(selector);
  }

  return (typingSnapshot: TypingSnapshot) => {
    let currentCharIndex = 0;

    rootContainer.innerHTML = "";

    const recursiveRender = (browserNode: HTMLElement) => {
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

    const dom = (
      typingFlowDOMParser
        .parseFromString(typingSnapshot.content.join(""), "text/html")
        .cloneNode(true) as Document
    ).body;

    if (typingSnapshot.cursorPosition === MIN_POSSIBLE_CURSOR_POSITION) {
      dom.innerHTML = ZERO_WIDTH_SPACE + dom.innerHTML;
      typingSnapshot.cursorPosition = 0;
    }

    recursiveRender(dom);

    dom.style.display = "contents";

    rootContainer.appendChild(dom);
  };
}
