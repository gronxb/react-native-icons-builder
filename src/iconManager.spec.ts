import { expect, describe, it } from "vitest";
import { IconManager } from "./iconManager";

describe("groupIconsByPrefix", () => {
  it("should group icons by name", () => {
    const iconManager = new IconManager({
      icons: [
        "ai/AiFillAccountBook",
        "ai/AiFillAlert",
        "cg/CgAddR",
        "fa/FaApple",
        "fa6/FaApple",
      ],
      outputPath: "",
      typescript: false,
    });

    expect(iconManager.groupedIcons).toEqual([
      ["ai", ["AiFillAccountBook", "AiFillAlert"]],
      ["cg", ["CgAddR"]],
      ["fa", ["FaApple"]],
      ["fa6", ["FaApple"]],
    ]);
  });

  it("should handle empty array", () => {
    const iconManager = new IconManager({
      icons: [],
      outputPath: "",
      typescript: false,
    });

    expect(iconManager.groupedIcons).toEqual([]);
  });
});
