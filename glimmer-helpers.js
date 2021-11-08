import { print } from "@glimmer/syntax";

export function isSvgJarHelper(node) {
  return (
    node.path.type === "PathExpression" && node.path.original === "svg-jar"
  );
}

export function isStaticSvgLookup(node) {
  const [identifier] = node.params;

  return identifier.type === "StringLiteral";
}

export function getStaticSvgIdentifier(node) {
  const [identifier] = node.params;

  return identifier.original;
}

export function getDynamicSvgIdentifier(node) {
  const [expression] = node.params;

  return print(expression);
}
