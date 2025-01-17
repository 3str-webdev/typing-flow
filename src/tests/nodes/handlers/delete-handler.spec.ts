import { TypingSnapshot } from "@/lib";
import { del, deleteTypingNodeHandler } from "@/lib/nodes";
import { DeleteTypingNode } from "@/lib/nodes/nodes.types";
import { describe, expect, test } from "vitest";

describe("delete command", () => {
  const container = document.createElement("div");

  test("delete basic", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "d"],
      cursorPosition: 1,
    };

    const node = del({ amount: 2, instant: true }) as DeleteTypingNode;

    deleteTypingNodeHandler(node, mockTypingSnapshot, container);

    expect(mockTypingSnapshot.content).toEqual(["a", "b"]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(1);
  });

  test("delete with tags", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "<strong>", "b", "c", "</strong>", "d"],
      cursorPosition: -1,
    };

    const node = del({ amount: 2, instant: true }) as DeleteTypingNode;

    deleteTypingNodeHandler(node, mockTypingSnapshot, container);

    expect(mockTypingSnapshot.content).toEqual([
      "<strong>",
      "c",
      "</strong>",
      "d",
    ]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(-1);
  });

  test("delete with tags and cursor on some symbol", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "<strong>", "b", "c", "</strong>", "d"],
      cursorPosition: 2,
    };

    const node = del({ amount: 1, instant: true }) as DeleteTypingNode;

    deleteTypingNodeHandler(node, mockTypingSnapshot, container);

    expect(mockTypingSnapshot.content).toEqual([
      "a",
      "<strong>",
      "b",
      "c",
      "</strong>",
    ]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(2);
  });

  test("delete over content end", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "<strong>", "b", "c", "</strong>", "d"],
      cursorPosition: 1,
    };

    const node = del({ amount: 1000, instant: true }) as DeleteTypingNode;

    deleteTypingNodeHandler(node, mockTypingSnapshot, container);

    expect(mockTypingSnapshot.content).toEqual([
      "a",
      "<strong>",
      "b",
      "</strong>",
    ]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(1);
  });
});
