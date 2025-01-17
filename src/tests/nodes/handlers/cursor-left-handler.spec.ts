import { TypingSnapshot } from "@/lib";
import { cursorLeft, cursorMoveLeftTypingNodeHandler } from "@/lib/nodes";
import { CursorMoveLeftTypingNode } from "@/lib/nodes/nodes.types";
import { describe, expect, test } from "vitest";

const container = document.createElement("div");

describe("cursorLeft command", () => {
  test("cursorLeft basic", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "d"],
      cursorPosition: 3,
    };

    const node = cursorLeft(2, { instant: true }) as CursorMoveLeftTypingNode;

    cursorMoveLeftTypingNodeHandler(node, mockTypingSnapshot, container);

    expect(mockTypingSnapshot.content).toEqual(["a", "b", "c", "d"]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(1);
  });

  test("cursorLeft with tags", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "<strong>", "b", "c", "</strong>", "d"],
      cursorPosition: 3,
    };

    const node = cursorLeft(2, { instant: true }) as CursorMoveLeftTypingNode;

    cursorMoveLeftTypingNodeHandler(node, mockTypingSnapshot, container);

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

  test("cursorLeft less than before first symbol", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "<strong>", "b", "c", "</strong>", "d"],
      cursorPosition: 1,
    };

    const node = cursorLeft(50, { instant: true }) as CursorMoveLeftTypingNode;

    cursorMoveLeftTypingNodeHandler(node, mockTypingSnapshot, container);

    expect(mockTypingSnapshot.content).toEqual([
      "a",
      "<strong>",
      "b",
      "c",
      "</strong>",
      "d",
    ]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(-1);
  });
});
