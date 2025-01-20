import { TypingFlowError } from "@/lib/shared/errors";
import { RendererType, TypingSnapshot } from "@/lib/shared/types";
import { typingFlowDOMParser } from "@/lib/shared/utils/browser";
import { AttributeRendererConfig } from "./renderer.types";

export const attributeRenderer = <T extends HTMLElement>({
  selector,
  attributes,
}: AttributeRendererConfig<T>): RendererType => {
  const container = document.querySelector(selector) as HTMLElement;

  if (!container) {
    throw TypingFlowError.ContainerNotFoundException(selector);
  }

  return (typingSnapshot: TypingSnapshot) => {
    // TODO: may be we can filter by isTagString for ignore tags
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
