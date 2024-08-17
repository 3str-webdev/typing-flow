import type { TypingNode } from "../../types";

export const isTextNode = (node: TypingNode): boolean => node.type === "text";
