export type TypingSnapshot = {
  content: Array<string>;
  cursorPosition: number;
};

export type CanBeArray<T> = T | Array<T>;

export type PossibleHooks = "onStart" | "onFinish";

export type RendererType = (typingSnapshot: TypingSnapshot) => void;

export type TypingFlowConfig = {
  renderer: RendererType;
  loop?: boolean;
};
