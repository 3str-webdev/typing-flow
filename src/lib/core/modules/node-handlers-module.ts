import {
  backspaceTypingNodeHandler,
  cursorMoveLeftTypingNodeHandler,
  cursorMoveRightTypingNodeHandler,
  delayTypingNodeHandler,
  deleteTypingNodeHandler,
  TextTypingNode,
  textTypingNodeHandler,
  TypingNode,
} from "@/lib/nodes";
import {
  BackspaceTypingNode,
  CursorMoveLeftTypingNode,
  CursorMoveRightTypingNode,
  DeleteTypingNode,
} from "@/lib/nodes/nodes.types";
import { MIN_POSSIBLE_CURSOR_POSITION } from "@/lib/shared/constants";
import { TypingSnapshot } from "@/lib/shared/types";

export class NodeHandlersModule {
  protected _typingSnapshot: TypingSnapshot = {
    content: [],
    cursorPosition: MIN_POSSIBLE_CURSOR_POSITION,
  };

  protected _nodeHandlers: Record<
    TypingNode["type"],
    (rootContainer: HTMLElement, node: TypingNode, index: number) => void
  > = {
    text: this._handleTextTypingNode.bind(this),
    backspace: this._handleBackspaceTypingNode.bind(this),
    delete: this._handleDeleteTypingNode.bind(this),
    cursorMoveLeft: this._handleCursorMoveLeftTypingNode.bind(this),
    cursorMoveRight: this._handleCursorMoveRightTypingNode.bind(this),
    delay: this._handleDelayTypingNode.bind(this),
  };

  private _handleTextTypingNode(
    rootContainer: HTMLElement,
    node: TextTypingNode,
  ) {
    textTypingNodeHandler(node, this._typingSnapshot, rootContainer);
  }

  private _handleBackspaceTypingNode(
    rootContainer: HTMLElement,
    node: BackspaceTypingNode,
  ) {
    backspaceTypingNodeHandler(node, this._typingSnapshot, rootContainer);
  }

  private _handleDeleteTypingNode(
    rootContainer: HTMLElement,
    node: DeleteTypingNode,
  ) {
    deleteTypingNodeHandler(node, this._typingSnapshot, rootContainer);
  }

  private _handleCursorMoveLeftTypingNode(
    rootContainer: HTMLElement,
    node: CursorMoveLeftTypingNode,
  ) {
    cursorMoveLeftTypingNodeHandler(node, this._typingSnapshot, rootContainer);
  }

  private _handleCursorMoveRightTypingNode(
    rootContainer: HTMLElement,
    node: CursorMoveRightTypingNode,
  ) {
    cursorMoveRightTypingNodeHandler(node, this._typingSnapshot, rootContainer);
  }

  private _handleDelayTypingNode() {
    delayTypingNodeHandler();
  }

  public get handlers() {
    return this._nodeHandlers;
  }

  public get typingSnapshot() {
    return this._typingSnapshot;
  }
}
