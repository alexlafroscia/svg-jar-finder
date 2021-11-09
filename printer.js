import chalk from "chalk";

/**
 * @param {string} path
 * @param {string[]} identifiers
 */
export function printHuman(path, identifiers) {
  console.log(chalk.blue(path));

  for (const identifier of identifiers) {
    console.log(identifier);
  }

  // Add space after each file's identifiers
  console.log("");
}

/**
 * @param {string} path
 * @param {string[]} identifiers
 */
export function printJSON(path, identifiers) {
  console.log(JSON.stringify({ path, identifiers }));
}
