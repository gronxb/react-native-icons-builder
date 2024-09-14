import { separateCamelCase } from "./separateCamelCase";

export const groupIconsByPrefix = (icons: string[]) => {
  const groupedIcons = icons.reduce((acc, icon) => {
    const [prefix] = separateCamelCase(icon);
    const lowerPrefix = prefix.toLowerCase();
    if (!acc[lowerPrefix]) {
      acc[lowerPrefix] = [];
    }

    acc[lowerPrefix].push(icon);
    return acc;
  }, {} as Record<string, string[]>);

  return Object.entries(groupedIcons);
};
