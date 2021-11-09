import yargs from "yargs";
import { hideBin } from "yargs/helpers";

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
  .help().argv;
