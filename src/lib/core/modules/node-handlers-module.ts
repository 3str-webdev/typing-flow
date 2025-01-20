import {
  backspaceTypingNodeHandler,
  cursorMoveLeftTypingNodeHandler,
  cursorMoveRightTypingNodeHandler,
  delayTypingNodeHandler,
  deleteTypingNodeHandler,
  endTypingNodeHandler,
  homeTypingNodeHandler,
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
    (node: TypingNode, index: number) => void
  > = {
    text: this._handleTextTypingNode.bind(this),
    backspace: this._handleBackspaceTypingNode.bind(this),
    delete: this._handleDeleteTypingNode.bind(this),
    cursorMoveLeft: this._handleCursorMoveLeftTypingNode.bind(this),
    cursorMoveRight: this._handleCursorMoveRightTypingNode.bind(this),
    delay: this._handleDelayTypingNode.bind(this),
    home: this._handleHomeTypingNode.bind(this),
    end: this._handleEndTypingNode.bind(this),
  };

  private _handleTextTypingNode(node: TextTypingNode) {
    textTypingNodeHandler(node, this._typingSnapshot);
  }

  private _handleBackspaceTypingNode(node: BackspaceTypingNode) {
    backspaceTypingNodeHandler(node, this._typingSnapshot);
  }

  private _handleDeleteTypingNode(node: DeleteTypingNode) {
    deleteTypingNodeHandler(node, this._typingSnapshot);
  }

  private _handleCursorMoveLeftTypingNode(node: CursorMoveLeftTypingNode) {
    cursorMoveLeftTypingNodeHandler(node, this._typingSnapshot);
  }

  private _handleCursorMoveRightTypingNode(node: CursorMoveRightTypingNode) {
    cursorMoveRightTypingNodeHandler(node, this._typingSnapshot);
  }

  private _handleDelayTypingNode() {
    delayTypingNodeHandler();
  }

  private _handleHomeTypingNode() {
    homeTypingNodeHandler(this._typingSnapshot);
  }

  private _handleEndTypingNode() {
    endTypingNodeHandler(this._typingSnapshot);
  }

  public get handlers() {
    return this._nodeHandlers;
  }

  public get typingSnapshot() {
    return this._typingSnapshot;
  }
}
