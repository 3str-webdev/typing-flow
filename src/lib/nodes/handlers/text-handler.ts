import { TypingSnapshot } from "@/lib/shared/types";
import { TextTypingNode } from "../nodes.types";

export function textTypingNodeHandler(
  node: TextTypingNode,
  typingSnapshot: TypingSnapshot,
  rootContainer: HTMLElement,
) {
  const buildedNode = node.nodeBuilder(rootContainer, typingSnapshot);

  if (buildedNode.isTag) {
    typingSnapshot.content.push(buildedNode.text);
  } else {
    typingSnapshot.content.push(...buildedNode.text.split(""));
    typingSnapshot.cursorPosition += 1;
  }
}
