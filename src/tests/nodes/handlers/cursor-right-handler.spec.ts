import { TypingSnapshot } from "@/lib";
import { cursorMoveRightTypingNodeHandler, cursorRight } from "@/lib/nodes";
import { CursorMoveRightTypingNode } from "@/lib/nodes/nodes.types";
import { MIN_POSSIBLE_CURSOR_POSITION } from "@/lib/shared/constants";
import { describe, expect, test } from "vitest";

describe("cursorRight command", () => {
  test("cursorRight basic", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "d"],
      cursorPosition: 0,
    };

    const node = cursorRight(2, { instant: true }) as CursorMoveRightTypingNode;

    cursorMoveRightTypingNodeHandler(node, mockTypingSnapshot);

    expect(mockTypingSnapshot.content).toEqual(["a", "b", "c", "d"]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(2);
  });

  test("cursorRight with tags", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "<strong>", "b", "c", "</strong>", "d"],
      cursorPosition: MIN_POSSIBLE_CURSOR_POSITION,
    };

    const node = cursorRight(2, { instant: true }) as CursorMoveRightTypingNode;

    cursorMoveRightTypingNodeHandler(node, mockTypingSnapshot);

    expect(mockTypingSnapshot.content).toEqual([
      "a",
      "<strong>",
      "b",
      "c",
      "</strong>",
      "d",
    ]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(1);
  });

  test("cursorRight over content end", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "<strong>", "b", "c", "</strong>", "d"],
      cursorPosition: 2,
    };

    const node = cursorRight(200, {
      instant: true,
    }) as CursorMoveRightTypingNode;

    cursorMoveRightTypingNodeHandler(node, mockTypingSnapshot);

    expect(mockTypingSnapshot.content).toEqual([
      "a",
      "<strong>",
      "b",
      "c",
      "</strong>",
      "d",
    ]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(3);
  });
});
