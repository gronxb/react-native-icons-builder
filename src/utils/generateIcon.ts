import fs from "fs/promises";
import { type ModuleItem, parse, print } from "@swc/core";
import { groupIconsByPrefix } from "./groupIconsByPrefix";

export const generateIcon = async (prefix: string, icons: string[]) => {
  const path = import.meta
    .resolve("react-icons")
    .replace("file://", "")
    .replace("/index.mjs", `/${prefix}/index.mjs`);

  const code = await fs.readFile(path, "utf8");

  const ast = await parse(code, {
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
          icons.includes(node.declaration.identifier.value)
        ) {
          return true;
        }
        return false;
      })
      .map(transformStringToIdentifier),
  };

  const outputCode = await print(filteredAst, {});
  if (outputCode.code.length === 0) {
    // throw new Error(`Icon ${iconName} not found`);
  }
  return outputCode.code;
};

export const syncIcons = async (icons: string[]) => {
  const groupedIcons = groupIconsByPrefix(icons);
  await Promise.all(
    groupedIcons.map(([prefix, icons]) => {
      generateIcon(prefix, icons);
    })
  );
};
