import { dirname } from "path";
import { fileURLToPath } from "url";
import { findPackageRoot } from "workspace-tools";

export const getCwd = () => findPackageRoot(process.cwd())!;
export const getDirname = () => dirname(fileURLToPath(import.meta.url));
