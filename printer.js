import chalk from "chalk";

/**
 * @typedef {import('./args').Args} Args
 */

/**
 * @param {string} path
 * @param {string[]} identifiers
 * @param {Args} args
 */
export function print(path, identifiers, args) {
  if (args.individual) {
    for (const identifier of identifiers) {
      print(path, [identifier], { ...args, individual: false });
    }

    return;
  }

  if (args.json) {
    printJSON(path, identifiers, args);
  } else {
    printHuman(path, identifiers, args);
  }
}

/**
 * @param {string} path
 * @param {string[]} identifiers
 */
function printHuman(path, identifiers) {
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
function printJSON(path, identifiers) {
  if (identifiers.length === 1) {
    const identifier = identifiers[0];

    console.log(JSON.stringify({ path, identifier }));
  } else {
    console.log(JSON.stringify({ path, identifiers }));
  }
}
