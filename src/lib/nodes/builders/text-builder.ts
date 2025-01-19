import { getBrowserNodeTagView } from "@/lib/shared/utils/browser";
import { TextTypingNode } from "../nodes.types";
import { isSpaceOnlyString } from "@/lib/shared/utils/strings";

const domParser = new DOMParser();

export const text = (
  text: string,
  options: {
    delay?: number;
    instant?: boolean;
  } = {},
): Array<TextTypingNode> => {
  const result: Array<TextTypingNode> = [];

  const recursiveTextHandler = (browserNode: HTMLElement) => {
    if (browserNode.nodeType === Node.TEXT_NODE) {
      const newNodes = browserNode.textContent
        .split("")
        .map<TextTypingNode>((char) => ({
          type: "text",
          nodeBuilder: () => ({
            text: char,
            delay: options.instant ? 0 : options.delay,
            instant: options.instant ?? false,
            isTag: false,
          }),
        }));

      result.push(...newNodes);
    } else if (browserNode.nodeType === Node.ELEMENT_NODE) {
      const tagView = getBrowserNodeTagView(browserNode);

      if (browserNode.tagName.toLowerCase() !== "body") {
        result.push({
          type: "text",
          nodeBuilder: () => ({
            text: tagView.open,
            delay: 0,
            instant: true,
            isTag: true,
          }),
        });
      }

      for (const child of browserNode.childNodes) {
        recursiveTextHandler(child as HTMLElement);
      }

      if (browserNode.tagName.toLowerCase() !== "body") {
        result.push({
          type: "text",
          nodeBuilder: () => ({
            text: tagView.close,
            delay: 0,
            instant: true,
            isTag: true,
          }),
        });
      }
    }
  };

  if (isSpaceOnlyString(text)) {
    return text.split("").map((char) => ({
      type: "text",
      nodeBuilder: () => ({
        text: char,
        delay: options.instant ? 0 : options.delay,
        instant: options.instant ?? false,
        isTag: false,
      }),
    }));
  }

  const parsedText = domParser.parseFromString(text, "text/html").body;

  recursiveTextHandler(parsedText);

  return result;
};
