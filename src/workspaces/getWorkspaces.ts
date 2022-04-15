
import { getWorkspaceImplementation } from "./implementations";

import { WorkspaceInfo } from "../types/WorkspaceInfo";
import { WorkspaceManager } from "./WorkspaceManager";

const preferred = process.env.PREFERRED_WORKSPACE_MANAGER as WorkspaceManager | null;

const defaultOptions = {
  includeRoot: true,
};

export type DefaultWorkspaceOptions = typeof defaultOptions;

export function getWorkspaces(cwd: string, options = defaultOptions): WorkspaceInfo {
  const workspaceImplementation = preferred || getWorkspaceImplementation(cwd);

  if (!workspaceImplementation) {
    return [];
  }

  switch (workspaceImplementation) {
    case "yarn":
      return require(`./implementations/yarn`).getYarnWorkspaces(cwd, options);

    case "pnpm":
      return require(`./implementations/pnpm`).getPnpmWorkspaces(cwd, options);

    case "rush":
      return require(`./implementations/rush`).getRushWorkspaces(cwd, options);

    case "npm":
      return require(`./implementations/npm`).getNpmWorkspaces(cwd, options);

    case "lerna":
      return require(`./implementations/lerna`).getLernaWorkspaces(cwd, options);
  }
}
