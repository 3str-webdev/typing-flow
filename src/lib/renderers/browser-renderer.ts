import { TypingSnapshot } from "@/lib/shared/types";
import { BrowserRendererConfig } from "./renderer.types";

export function browserRenderer({
	baseNodeClasses = ["typing-node"],
	nodeWithCursorClasses = ["typing-node_with-cursor"],
}: BrowserRendererConfig = {}) {
	return (container: HTMLElement, typingSnapshot: TypingSnapshot) => {
		container.innerHTML = "";

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
