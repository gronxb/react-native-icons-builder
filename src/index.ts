import { parseSync, printSync } from "@swc/core";
import fs from "node:fs";

// 사용자 인풋
const userInput = "AiFillAliwangwang";

const code = fs.readFileSync("./node_modules/react-icons/ai/index.mjs", "utf8");

const ast = parseSync(code, {
  syntax: "ecmascript", // 사용된 JavaScript 구문 지정
  jsx: true, // JSX를 사용하는 경우 true로 설정
});

// AST에서 원하는 함수만 추출
const filteredAst = {
  ...ast,
  body: ast.body.filter((node) => {
    if (
      node.type === "ExportDeclaration" &&
      node.declaration.type === "FunctionDeclaration" &&
      node.declaration.identifier.value === userInput
    ) {
      return true;
    }
    return false;
  }),
};

const outputCode = printSync(filteredAst).code;

// 결과 출력
console.log(outputCode);
