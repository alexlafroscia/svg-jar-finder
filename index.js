import path from "node:path";
import { promises as fs } from "node:fs";

import execa from "execa";
import { preprocess as parse, traverse } from "@glimmer/syntax";

import {
  isSvgJarHelper,
  isStaticSvgLookup,
  getStaticSvgIdentifier,
  getDynamicSvgIdentifier,
} from "./glimmer-helpers.js";

const [_nodePath, _executablePath, pathToSearch = "./"] = process.argv;

// Resolve the "path" argument against the current directory to support relative arguments
const fullPath = path.resolve(process.cwd(), pathToSearch);

const { stdout } = await execa(
  "rg",
  [
    // Only locate the names of files that contain the pattern
    "-l",
    // Search for the exact text "svg-jar"
    "-F",
    "svg-jar",
    // Only search handlebars files
    "-thbs",
    // For some reason, this is required to avoid RipGrep hanging
    ".",
  ],
  { cwd: fullPath }
);

const relativeFilesWithMatch = stdout.split("\n");

const absoluteFilesWithMatch = relativeFilesWithMatch.map((relative) =>
  path.resolve(process.cwd(), relative)
);

const identifiers = new Set();

await Promise.all(
  absoluteFilesWithMatch.map(async function (fileName) {
    const ast = parse((await fs.readFile(fileName)).toString());

    traverse(ast, {
      MustacheStatement: {
        enter(node) {
          if (isSvgJarHelper(node)) {
            const identifier = isStaticSvgLookup(node)
              ? `"${getStaticSvgIdentifier(node)}"`
              : getDynamicSvgIdentifier(node);

            identifiers.add(identifier);
          }
        },
      },
    });
  })
);

// Print each identifier passed to `svg-jar`
for (const identifier of identifiers) {
  console.log(identifier);
}
