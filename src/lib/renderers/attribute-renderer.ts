import { TypingSnapshot } from "@/lib/shared/types";
import { typingFlowDOMParser } from "../shared/utils/browser";

export const attributeRenderer = <T extends HTMLElement>(
  attributes: (keyof T | `data-${string}`)[],
) => {
  return (container: HTMLElement, typingSnapshot: TypingSnapshot) => {
    const dom = typingFlowDOMParser.parseFromString(
      typingSnapshot.content.join(""),
      "text/html",
    );

    // ignore tags
    typingSnapshot.content = dom.body.textContent.split("");

    for (const attribute of attributes) {
      container.setAttribute(
        attribute as string,
        typingSnapshot.content.join(""),
      );
    }
  };
};
