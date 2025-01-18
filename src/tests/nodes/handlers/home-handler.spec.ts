import { TypingSnapshot } from "@/lib";
import { homeTypingNodeHandler } from "@/lib/nodes";
import { describe, expect, test } from "vitest";

describe("home command", () => {
  test("home basic", () => {
    const mockTypingSnapshot: TypingSnapshot = {
      content: ["a", "b", "c", "d"],
      cursorPosition: 3,
    };

    homeTypingNodeHandler(mockTypingSnapshot);

    expect(mockTypingSnapshot.content).toEqual(["a", "b", "c", "d"]);
    expect(mockTypingSnapshot.cursorPosition).toEqual(-1);
  });
});
