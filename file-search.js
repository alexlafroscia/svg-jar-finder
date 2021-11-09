import path from "node:path";
import execa from "execa";

function resolve(relative) {
  return path.resolve(process.cwd(), relative);
}

export async function getSvgJarFilePaths(pathToSearch) {
  try {
    const { stdout } = await execa("rg", [
      // Only locate the names of files that contain the pattern
      // This is preferred because we are going to parse the files to analyze each invocation anyway
      // We just need RipGrep to tell us which files we need to parse
      "-l",
      // Search for the exact text "svg-jar"
      "-F",
      "svg-jar",
      // Only search handlebars files
      "-thbs",
      // Tell `rg `which directory to search
      resolve(pathToSearch),
    ]);

    return stdout.split("\n").map((relative) => resolve(relative));
  } catch (e) {
    // Probably failed due to no matches
    // TODO: there's probably a ripgrep option to avoid a non-0 exit code when we have no matches. That would be a
    // better approach than this
    return [];
  }
}
