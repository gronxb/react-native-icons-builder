const data = `
function Fa1() {
}
`;

export const searchFunction = (data: string, funcName: string): boolean => {
  const regex = new RegExp(`function\\s+${funcName}\\s*\\(`);
  return regex.test(data);
};
