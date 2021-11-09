import path from "node:path";
import { promises as fs } from "node:fs";
import { preprocess as parse, traverse } from "@glimmer/syntax";
import { args } from "./args.js";
import { getSvgJarFilePaths } from "./file-search.js";
import {
  isSvgJarHelper,
  isStaticSvgLookup,
  getStaticSvgIdentifier,
  getDynamicSvgIdentifier,
} from "./glimmer-helpers.js";
import { print } from "./printer.js";

const { path: pathToSearch } = args;
const absoluteFilesWithMatch = await getSvgJarFilePaths(pathToSearch);
const filesWithIdentifiers = new Map();

await Promise.all(
  absoluteFilesWithMatch.map(async function (fileName) {
    const identifiers = [];
    const ast = parse((await fs.readFile(fileName)).toString());

    traverse(ast, {
      MustacheStatement: {
        enter(node) {
          if (isSvgJarHelper(node)) {
            const identifier = isStaticSvgLookup(node)
              ? `"${getStaticSvgIdentifier(node)}"`
              : getDynamicSvgIdentifier(node);

            identifiers.push(identifier);
          }
        },
      },
    });

    filesWithIdentifiers.set(
      path.relative(pathToSearch, fileName),
      identifiers
    );
  })
);

// Print each identifier passed to `svg-jar`
for (const [path, identifiers] of filesWithIdentifiers.entries()) {
  print(path, identifiers, args);
}
