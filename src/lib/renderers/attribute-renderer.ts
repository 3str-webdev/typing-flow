import { TypingSnapshot } from "@/lib/shared/types";

export const attributeRenderer = <T extends HTMLElement>(
  attributes: (keyof T | `data-${string}`)[],
) => {
  return (container: HTMLElement, typingSnapshot: TypingSnapshot) => {
    for (const attribute of attributes) {
      container.setAttribute(
        attribute as string,
        typingSnapshot.content.join(""),
      );
    }
  };
};
