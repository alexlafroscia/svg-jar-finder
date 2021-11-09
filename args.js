import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/**
 * @typedef Args
 * @property {string} path
 * @property {boolean} json
 * @property {boolean} individual
 */

/**
 * @type {Args}
 */
export const args = yargs(hideBin(process.argv))
  .command("$0 <path>", "Search for the SVGs rendered in an app")
  .positional("path", {
    describe: "path to the app to search",
    default: "./",
  })
  .option("json", {
    describe: "print results as JSON",
    default: false,
    type: "boolean",
  })
  .option("individual", {
    alias: "i",
    describe: "report each icon usage as a separate entry",
    default: false,
    type: "boolean",
  })
  .help().argv;
