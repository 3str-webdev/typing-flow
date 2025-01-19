import { TypingSnapshot } from "@/lib";
import { text, textTypingNodeHandler } from "@/lib/nodes";
import { MIN_POSSIBLE_CURSOR_POSITION } from "@/lib/shared/constants";
import { describe, expect, test } from "vitest";

describe("text command", () => {
  test("text basic", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "d"],
      cursorPosition: 3,
    };

    const nodes = text("ef", { instant: true });

    for (const node of nodes) {
      textTypingNodeHandler(node, mockTypingSnapshot);
    }

    expect(mockTypingSnapshot.content).toEqual(["a", "b", "c", "d", "e", "f"]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(5);
  });

  test("text with tags", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "d"],
      cursorPosition: 3,
    };

    const nodes = text("<strong>ef</strong>", { instant: true });

    for (const node of nodes) {
      textTypingNodeHandler(node, mockTypingSnapshot);
    }

    expect(mockTypingSnapshot.content).toEqual([
      "a",
      "b",
      "c",
      "d",
      "<strong>",
      "e",
      "f",
      "</strong>",
    ]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(5);
  });

  test("text without viewable symbols", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: [],
      cursorPosition: MIN_POSSIBLE_CURSOR_POSITION,
    };

    const nodes = text("<b></b>", { instant: true });

    for (const node of nodes) {
      textTypingNodeHandler(node, mockTypingSnapshot);
    }

    expect(mockTypingSnapshot.content).toEqual(["<b>", "</b>"]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(
      MIN_POSSIBLE_CURSOR_POSITION,
    );
  });

  test("text inserting", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "d"],
      cursorPosition: 1,
    };

    const nodes = text("<span>ef</span>g", { instant: true });

    for (const node of nodes) {
      textTypingNodeHandler(node, mockTypingSnapshot);
    }

    expect(mockTypingSnapshot.content).toEqual([
      "a",
      "b",
      "<span>",
      "e",
      "f",
      "</span>",
      "g",
      "c",
      "d",
    ]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(4);
  });

  test("text inserting inside tag", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "<span>", "e", "f", "</span>", "g"],
      cursorPosition: 2,
    };

    const nodes = text("<i>h</i>", { instant: true });

    for (const node of nodes) {
      textTypingNodeHandler(node, mockTypingSnapshot);
    }

    expect(mockTypingSnapshot.content).toEqual([
      "a",
      "b",
      "<span>",
      "e",
      "<i>",
      "h",
      "</i>",
      "f",
      "</span>",
      "g",
    ]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(3);
  });

  test("text inserting space", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "d"],
      cursorPosition: 1,
    };

    const nodes = text(" ", { instant: true });

    for (const node of nodes) {
      textTypingNodeHandler(node, mockTypingSnapshot);
    }

    expect(mockTypingSnapshot.content).toEqual(["a", "b", " ", "c", "d"]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(2);
  });
});
