import { WorkspaceInfo } from "../../types/WorkspaceInfo";
import { DefaultWorkspaceOptions } from "../getWorkspaces";
import { getPackageJsonWorkspaceRoot, getWorkspaceInfoFromWorkspaceRoot } from "./packageJsonWorkspaces";

export function getYarnWorkspaceRoot(cwd: string): string {
  const yarnWorkspacesRoot = getPackageJsonWorkspaceRoot(cwd);

  if (!yarnWorkspacesRoot) {
    throw new Error("Could not find yarn workspaces root");
  }

  return yarnWorkspacesRoot;
}

export function getYarnWorkspaces(cwd: string, options: DefaultWorkspaceOptions): WorkspaceInfo {
  const yarnWorkspacesRoot = getYarnWorkspaceRoot(cwd);
  return getWorkspaceInfoFromWorkspaceRoot(yarnWorkspacesRoot, options);
}
