import { parseSync, printSync } from "@swc/core";
import fs from "fs";

// 사용자 인풋
const userInput = "AiFillAliwangwang";

// SWC로 코드를 파싱하여 AST 생성
const code = fs.readFileSync("./node_modules/react-icons/ai/index.mjs", "utf8");

// SWC로 코드를 AST로 파싱
const ast = parseSync(code, {
  syntax: "ecmascript", // 사용된 JavaScript 구문 지정
  jsx: true, // JSX를 사용하는 경우 true로 설정
});

// AST에서 원하는 함수만 추출
const filteredAst = {
  ...ast,
  body: ast.body.filter(node => {
    // 함수 선언 또는 함수 표현식에서 함수 이름이 userInput과 일치하는 경우만 남김
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

// 필터링된 코드를 다시 JavaScript 코드로 변환
const outputCode = printSync(filteredAst).code;

// 결과 출력
console.log(outputCode);