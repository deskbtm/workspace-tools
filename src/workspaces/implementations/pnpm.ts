import { DefaultWorkspaceOptions } from "./../getWorkspaces";
import path from "path";
import findUp from "find-up";

import { getPackagePaths } from "../../getPackagePaths";
import { WorkspaceInfo } from "../../types/WorkspaceInfo";
import { getWorkspacePackageInfo } from "../getWorkspacePackageInfo";

type PnpmWorkspaces = {
  packages: string[];
};

export function getPnpmWorkspaceRoot(cwd: string): string {
  const pnpmWorkspacesFile = findUp.sync("pnpm-workspace.yaml", { cwd });

  if (!pnpmWorkspacesFile) {
    throw new Error("Could not find pnpm workspaces root");
  }

  return path.dirname(pnpmWorkspacesFile);
}

export function getPnpmWorkspaces(cwd: string, options: DefaultWorkspaceOptions): WorkspaceInfo {
  try {
    const pnpmWorkspacesRoot = getPnpmWorkspaceRoot(cwd);
    const pnpmWorkspacesFile = path.join(pnpmWorkspacesRoot, "pnpm-workspace.yaml");

    const readYaml = require("read-yaml-file").sync;
    const pnpmWorkspaces = readYaml(pnpmWorkspacesFile) as PnpmWorkspaces;

    const packagePaths = getPackagePaths(pnpmWorkspacesRoot, pnpmWorkspaces.packages, options.includeRoot);

    const workspaceInfo = getWorkspacePackageInfo(packagePaths);

    return workspaceInfo;
  } catch {
    return [];
  }
}
