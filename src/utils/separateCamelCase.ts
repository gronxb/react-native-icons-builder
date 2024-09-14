export const separateCamelCase = (name: string) => {
  const result = [];
  let currentWord = "";

  for (const char of name) {
    if (char === char.toUpperCase() && currentWord) {
      result.push(currentWord);
      currentWord = char;
    } else {
      currentWord += char;
    }
  }

  result.push(currentWord);
  return result;
};
