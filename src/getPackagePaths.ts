import path from "path";
import globby from "globby";

const packagePathsCache: { [workspacesRoot: string]: string[] } = {};

export function getPackagePaths(workspacesRoot: string, packages: string[], includeRoot: boolean): string[] {
  if (packagePathsCache[workspacesRoot]) {
    return packagePathsCache[workspacesRoot];
  }

  const packagePaths = globby
    .sync(
      packages.map((glob) => path.join(glob, "package.json").replace(/\\/g, "/")),
      {
        cwd: workspacesRoot,
        absolute: true,
        ignore: ["**/node_modules/**"],
        stats: false,
      }
    )
    .map((p) => path.dirname(p));

  packagePaths.unshift(workspacesRoot);

  if (path.sep === "/") {
    packagePathsCache[workspacesRoot] = packagePaths;
  } else {
    packagePathsCache[workspacesRoot] = packagePaths.map((p) => p.replace(/\//g, path.sep));
  }

  return packagePathsCache[workspacesRoot];
}
