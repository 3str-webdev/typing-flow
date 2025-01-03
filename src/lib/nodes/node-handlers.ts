import { MIN_POSSIBLE_CURSOR_POSITION } from "@/lib/shared/constants";
import { TypingSnapshot } from "@/lib/shared/types";
import {
	BackspaceTypingNode,
	CursorMoveLeftTypingNode,
	CursorMoveRightTypingNode,
	DeleteTypingNode,
	TextTypingNode
} from "./nodes.types";

export function textTypingNodeHandler(
	node: TextTypingNode,
	typingSnapshot: TypingSnapshot,
	rootContainer: HTMLElement,
) {
	const buildedNode = node.nodeBuilder(rootContainer, typingSnapshot);

	typingSnapshot.content.push(buildedNode.text);
	typingSnapshot.cursorPosition += buildedNode.text.length;
}

export function backspaceTypingNodeHandler(
	node: BackspaceTypingNode,
	typingSnapshot: TypingSnapshot,
	rootContainer: HTMLElement,
) {
	if (typingSnapshot.cursorPosition < 0) return;

	const buildedNode = node.nodeBuilder(rootContainer, typingSnapshot);

	typingSnapshot.content.splice(
		typingSnapshot.cursorPosition - buildedNode.amount + 1,
		buildedNode.amount,
	);

	typingSnapshot.cursorPosition -= buildedNode.amount;
}

export function deleteTypingNodeHandler(
	node: DeleteTypingNode,
	typingSnapshot: TypingSnapshot,
	rootContainer: HTMLElement,
) {
	if (typingSnapshot.cursorPosition < 0) return;

	const buildedNode = node.nodeBuilder(rootContainer, typingSnapshot);

	typingSnapshot.content.splice(
		typingSnapshot.cursorPosition + 1,
		buildedNode.amount,
	);
}

export function cursorMoveLeftTypingNodeHandler(
	node: CursorMoveLeftTypingNode,
	typingSnapshot: TypingSnapshot,
	rootContainer: HTMLElement,
) {
	const buildedNode = node.nodeBuilder(rootContainer, typingSnapshot);

	typingSnapshot.cursorPosition = Math.max(
		typingSnapshot.cursorPosition - buildedNode.distance,
		MIN_POSSIBLE_CURSOR_POSITION,
	);
}

export function cursorMoveRightTypingNodeHandler(
	node: CursorMoveRightTypingNode,
	typingSnapshot: TypingSnapshot,
	rootContainer: HTMLElement,
) {
	const buildedNode = node.nodeBuilder(rootContainer, typingSnapshot);

	typingSnapshot.cursorPosition = Math.min(
		typingSnapshot.cursorPosition + buildedNode.distance,
		typingSnapshot.content.length - 1,
	);
}

export function delayTypingNodeHandler() {}