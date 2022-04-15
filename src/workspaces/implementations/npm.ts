import { WorkspaceInfo } from "../../types/WorkspaceInfo";
import { DefaultWorkspaceOptions } from "../getWorkspaces";
import { getPackageJsonWorkspaceRoot, getWorkspaceInfoFromWorkspaceRoot } from "./packageJsonWorkspaces";

export function getNpmWorkspaceRoot(cwd: string): string {
  const npmWorkspacesRoot = getPackageJsonWorkspaceRoot(cwd);

  if (!npmWorkspacesRoot) {
    throw new Error("Could not find NPM workspaces root");
  }

  return npmWorkspacesRoot;
}

export function getNpmWorkspaces(cwd: string, options: DefaultWorkspaceOptions): WorkspaceInfo {
  const npmWorkspacesRoot = getNpmWorkspaceRoot(cwd);
  return getWorkspaceInfoFromWorkspaceRoot(npmWorkspacesRoot, options);
}
