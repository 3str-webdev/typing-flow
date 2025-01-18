import { TypingSnapshot } from "@/lib";
import { endTypingNodeHandler } from "@/lib/nodes";
import { describe, expect, test } from "vitest";

describe("end command", () => {
  test("end basic", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "d"],
      cursorPosition: 1,
    };

    endTypingNodeHandler(mockTypingSnapshot);

    expect(mockTypingSnapshot.content).toEqual(["a", "b", "c", "d"]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(3);
  });

  test("end with tags", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "<strong>", "d", "</strong>"],
      cursorPosition: 1,
    };

    endTypingNodeHandler(mockTypingSnapshot);

    expect(mockTypingSnapshot.content).toEqual([
      "a",
      "b",
      "c",
      "<strong>",
      "d",
      "</strong>",
    ]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(3);
  });
});
