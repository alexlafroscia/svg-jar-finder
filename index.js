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

const { path } = args;
const absoluteFilesWithMatch = await getSvgJarFilePaths(path);
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
