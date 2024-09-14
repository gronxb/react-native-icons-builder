export const groupIconsByPrefix = (icons: string[]) => {
  const groupedIcons = icons.reduce((acc, icon) => {
    const prefix = icon.slice(0, 2).toLowerCase();
    if (!acc[prefix]) {
      acc[prefix] = [];
    }
    acc[prefix].push(icon);
    return acc;
  }, {} as Record<string, string[]>);

  return Object.entries(groupedIcons);
};
