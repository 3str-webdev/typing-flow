import { TypingSnapshot } from "@/lib";
import { backspace, backspaceTypingNodeHandler } from "@/lib/nodes";
import { BackspaceTypingNode } from "@/lib/nodes/nodes.types";
import { MIN_POSSIBLE_CURSOR_POSITION } from "@/lib/shared/constants";
import { describe, expect, test } from "vitest";

describe("backspace command", () => {
  test("backspace basic", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "d"],
      cursorPosition: 3,
    };

    const node = backspace({ amount: 2, instant: true }) as BackspaceTypingNode;

    backspaceTypingNodeHandler(node, mockTypingSnapshot);

    expect(mockTypingSnapshot.content).toEqual(["a", "b"]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(1);
  });

  test("backspace with tags", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "<strong>", "b", "c", "</strong>", "d"],
      cursorPosition: 3,
    };

    const node = backspace({ amount: 2, instant: true }) as BackspaceTypingNode;

    backspaceTypingNodeHandler(node, mockTypingSnapshot);

    expect(mockTypingSnapshot.content).toEqual([
      "a",
      "<strong>",
      "b",
      "</strong>",
    ]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(1);
  });

  test("backspace with cursor on start", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "d"],
      cursorPosition: 1,
    };

    const node = backspace({
      amount: 10,
      instant: true,
    }) as BackspaceTypingNode;

    backspaceTypingNodeHandler(node, mockTypingSnapshot);

    expect(mockTypingSnapshot.content).toEqual(["c", "d"]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(
      MIN_POSSIBLE_CURSOR_POSITION,
    );
  });
});
