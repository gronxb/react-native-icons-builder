import { separateCamelCase } from "./separateCamelCase";
import { expect, describe, it } from "vitest";

describe("separateCamelCase", () => {
  it("should separate camel case", () => {
    expect(separateCamelCase("helloWorld")).toStrictEqual(["hello", "World"]);
    expect(separateCamelCase("Lia500Px")).toStrictEqual([
      "Lia",
      "5",
      "0",
      "0",
      "Px",
    ]);
    expect(separateCamelCase("HiAcademicCap")).toStrictEqual([
      "Hi",
      "Academic",
      "Cap",
    ]);
    expect(separateCamelCase("Bs0CircleFill")).toStrictEqual([
      "Bs",
      "0",
      "Circle",
      "Fill",
    ]);
  });
  expect(separateCamelCase("VscAccount")).toStrictEqual(["Vsc", "Account"]);
});
