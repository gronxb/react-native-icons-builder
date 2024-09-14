import { expect, describe, it } from "vitest";
import { groupIconsByPrefix } from "./groupIconsByPrefix";

describe("groupIconsByPrefix", () => {
  it("should group icons by name", () => {
    const icons = ["AiFillAccountBook", "AiFillAlert", "CgAddR", "FaApple"];
    expect(groupIconsByPrefix(icons)).toEqual([
      ["ai", ["AiFillAccountBook", "AiFillAlert"]],
      ["cg", ["CgAddR"]],
      ["fa", ["FaApple"]],
    ]);
  });

  it("should handle empty array", () => {
    const icons: string[] = [];
    expect(groupIconsByPrefix(icons)).toEqual([]);
  });

  it("should handle single icon", () => {
    const icons = ["AiFillAccountBook"];
    expect(groupIconsByPrefix(icons)).toEqual([["ai", ["AiFillAccountBook"]]]);
  });

  it("should handle multiple icons with different prefixes", () => {
    const icons = ["AiFillAccountBook", "CgAddR", "FaApple"];
    expect(groupIconsByPrefix(icons)).toEqual([
      ["ai", ["AiFillAccountBook"]],
      ["cg", ["CgAddR"]],
      ["fa", ["FaApple"]],
    ]);
  });
});
