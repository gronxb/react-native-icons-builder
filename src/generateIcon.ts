import fs from "fs";
import { type ModuleItem, parseSync, printSync } from "@swc/core";
import { findUpSync } from "find-up";
import { cwd } from "./cwd";

export const generateIcon = (iconName: string) => {
  const prefix = iconName.slice(0, 2).toLowerCase();

  const path = import.meta
    .resolve("react-icons")
    .replace("file://", "")
    .replace("/index.mjs", `/${prefix}/index.mjs`);

  const code = fs.readFileSync(path, "utf8");

  const ast = parseSync(code, {
    syntax: "ecmascript",
    jsx: true,
  });

  function transformStringToIdentifier(moduleItem: ModuleItem): ModuleItem {
    function transform(item: any): any {
      if (Array.isArray(item)) {
        return item.map(transform);
      }

      if (typeof item === "object" && item !== null) {
        if (
          item.type === "KeyValueProperty" &&
          item.key.value === "tag" &&
          item.value.type === "StringLiteral"
        ) {
          return {
            ...item,
            value: {
              type: "Identifier",
              span: {
                start: item.value.span.start,
                end: item.value.span.end - 2,
              },
              ctxt: 0,
              value:
                item.value.value.charAt(0).toUpperCase() +
                item.value.value.slice(1),
              optional: false,
            },
          };
        }

        const newObj = {} as Record<string, any>;
        for (const key in item) {
          newObj[key] = transform(item[key]);
        }
        return newObj;
      }

      return item;
    }

    return transform(moduleItem);
  }

  const filteredAst = {
    ...ast,
    body: ast.body
      .filter((node) => {
        if (
          node.type === "ExportDeclaration" &&
          node.declaration.type === "FunctionDeclaration" &&
          node.declaration.identifier.value === iconName
        ) {
          return true;
        }
        return false;
      })
      .map(transformStringToIdentifier),
  };

  const outputCode = printSync(filteredAst, {});
  if (outputCode.code.length === 0) {
    throw new Error(`Icon ${iconName} not found`);
  }
  return outputCode.code;
};
