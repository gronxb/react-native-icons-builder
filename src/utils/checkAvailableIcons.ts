import fs from "fs/promises";

export const checkAvailableIcons = async (
  prefix: string,
  iconNames: string[]
) => {
  try {
    const icons = import.meta.resolve(`react-icons/${prefix}`);
    const file = await fs.readFile(icons.replace("file://", ""), "utf8");
    return (
      iconNames.length > 0 &&
      iconNames.every((iconName) => file.includes(iconName))
    );
  } catch (error) {
    return false;
  }
};
