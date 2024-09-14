import path from "path";
import fs from "fs/promises";
import { type ModuleItem, parse, print } from "@swc/core";
import { groupIconsByPrefix } from "./groupIconsByPrefix";
import type { Config } from "./config";
import { getCwd } from "./cwd";
import { log } from "./console";

export const generateIconCode = async (
  prefix: string,
  icons: string[],
  typescript: boolean
) => {
  const path = import.meta
    .resolve(`react-icons/${prefix}`)
    .replace("file://", "");

  const reactIconsCode = await fs.readFile(path, "utf8");

  const ast = await parse(reactIconsCode, {
    syntax: "ecmascript",
    jsx: true,
  });

  const svgTagSet = new Set<string>();

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
          const svgTag =
            item.value.value.charAt(0).toUpperCase() +
            item.value.value.slice(1);
          svgTagSet.add(svgTag);
          return {
            ...item,
            value: {
              type: "Identifier",
              span: {
                start: item.value.span.start,
                end: item.value.span.end - 2,
              },
              ctxt: 0,
              value: svgTag,
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
  let code = outputCode.code;
  if (typescript) {
    code = code.replaceAll("(props) ", "(props: IconBaseProps) ");
  }
  code = `
import { ${[...svgTagSet].join(", ")} } from "react-native-svg"
import { ${typescript ? "type IconBaseProps, " : ""}GenIcon } from "./iconBase";
  
${code}
  `;

  return {
    filename: typescript ? `${prefix}.tsx` : `${prefix}.jsx`,
    code,
  };
};

const saveIcons = async (
  outputPath: string,
  filename: string,
  code: string
) => {
  const cwd = getCwd();
  const $outputPath = path.join(cwd, outputPath);
  await fs.mkdir($outputPath, { recursive: true });

  await fs.writeFile(path.join($outputPath, filename), code, "utf8");
  log.save(path.join(outputPath, filename));
};

export const syncIcons = async (config: Config) => {
  const groupedIcons = groupIconsByPrefix(config.icons);
  await Promise.all(
    groupedIcons.map(async ([prefix, icons]) => {
      const data = await generateIconCode(prefix, icons, config.typescript);
      await saveIcons(config.outputPath, data.filename, data.code);
    })
  );
};
