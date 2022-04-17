import findUp from "find-up";
import path from "path";
import jju from "jju";
import fs from "fs";

import { WorkspaceInfo } from "../../types/WorkspaceInfo";
import { getWorkspacePackageInfo } from "../getWorkspacePackageInfo";
import { DefaultWorkspaceOptions } from "../getWorkspaces";

export function getRushWorkspaceRoot(cwd: string): string {
  const rushJsonPath = findUp.sync("rush.json", { cwd });

  if (!rushJsonPath) {
    throw new Error("Could not find rush workspaces root");
  }

  return path.dirname(rushJsonPath);
}

export function getRushWorkspaces(cwd: string, options: DefaultWorkspaceOptions): WorkspaceInfo {
  try {
    const rushWorkspaceRoot = getRushWorkspaceRoot(cwd);
    const rushJsonPath = path.join(rushWorkspaceRoot, "rush.json");

    const rushConfig = jju.parse(fs.readFileSync(rushJsonPath, "utf-8"));
    const root = path.dirname(rushJsonPath);

    const packagePaths = rushConfig.projects.map((project) => path.join(root, project.projectFolder));

    if (options.includeRoot) {
      packagePaths.unshift(rushWorkspaceRoot);
    }

    return getWorkspacePackageInfo(packagePaths);
  } catch {
    return options.includeRoot ? getWorkspacePackageInfo([cwd]) : [];
  }
}
