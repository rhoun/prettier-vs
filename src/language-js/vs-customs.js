export function customPrint(node, docText) {
  const part = docText.slice(node.start, node.end);

  if (node.type === "UnaryExpression") {
    return part;
  }

  let result;
  try {
    if (
      (part.startsWith("{") && part.endsWith("}")) ||
      (part.startsWith("[") && part.endsWith("]"))
    ) {
      result = JSON.stringify(JSON.parse(part), null, 1);
    } else {
      result = JSON.stringify(JSON.parse(`{${part}}`), null, 1).slice(2, -2);
    }
  } catch {
    //just so we don't entirely fail if I didn't handle some cases
    result = part;
  }

  result = result
    .split("\n")
    .map((line) => line.trim())
    .join(" ");

  return result;
}

export function textLength(text, start, end) {
  const extracted = text.slice(start, end);
  const formatted = extracted.replaceAll(/\s+/g, " ");
  return formatted.length;
}
