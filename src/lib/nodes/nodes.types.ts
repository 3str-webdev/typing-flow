import { TypingSnapshot } from "../shared/types";

export type TypingNode =
  | TextTypingNode
  | BackspaceTypingNode
  | DeleteTypingNode
  | CursorMoveLeftTypingNode
  | CursorMoveRightTypingNode
  | DelayTypingNode;

type WithType<T extends string, P> = {
  type: T;
  nodeBuilder: P;
};

type NodeBuilder<T> = (
  rootContainer: HTMLElement,
  typingSnapshot: TypingSnapshot,
) => T;

export type TextTypingNode = WithType<
  "text",
  NodeBuilder<{
    text: string;
    instant: boolean;
    delay: number;
    container: HTMLElement | ChildNode;
    isTag: boolean;
  }>
>;

export type BackspaceTypingNode = WithType<
  "backspace",
  NodeBuilder<{
    amount: number;
    instant: boolean;
    delay: number;
  }>
>;

export type DeleteTypingNode = WithType<
  "delete",
  NodeBuilder<{
    amount: number;
    instant: boolean;
    delay: number;
  }>
>;

export type CursorMoveLeftTypingNode = WithType<
  "cursorMoveLeft",
  NodeBuilder<{
    distance: number;
    instant: boolean;
    delay: number;
  }>
>;

export type CursorMoveRightTypingNode = WithType<
  "cursorMoveRight",
  NodeBuilder<{
    distance: number;
    instant: boolean;
    delay: number;
  }>
>;

export type DelayTypingNode = WithType<"delay", NodeBuilder<{ delay: number }>>;
