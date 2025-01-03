export type TypingSnapshot = {
  content: Array<string>;
  cursorPosition: number;
};

export type CanBeArray<T> = T | Array<T>;

export type PossibleHooks = "onStart" | "onFinish";

export type RendererType = (
  container: HTMLElement,
  typingSnapshot: TypingSnapshot,
) => void;

export type TypingFlowConfig = {
  selector: string;
  renderer: RendererType;
  loop?: boolean;
};
