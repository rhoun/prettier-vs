function isPatternString(str) {
  return /^[#_]+$/.test(str);
}

function isPatternArray(node) {
  if (node.type !== "ArrayExpression") {
    return false;
  }

  return node.elements.some(element => {
    // Check for direct string patterns (single level)
    if (element?.type === "StringLiteral" && typeof element.value === "string") {
      return isPatternString(element.value);
    }

    // Check for nested arrays containing patterns (double level)
    if (element?.type === "ArrayExpression") {
      return element.elements.every(nestedElement =>
        nestedElement?.type === "StringLiteral" &&
        typeof nestedElement.value === "string" &&
        isPatternString(nestedElement.value)
      );
    }

    return false;
  });
}

export function hasPatternStrings(node) {
  if (!node.value || node.value.type !== "ArrayExpression") {
    return false;
  }

  return isPatternArray(node.value);
}

function printPatternArray(node, docText, indent = 0) {
  const indentStr = "  ".repeat(indent);
  const nextIndentStr = "  ".repeat(indent + 1);

  if (node.type === "ObjectProperty") {
    const keyName = node.key.name || JSON.stringify(node.key.value);
    const arrayResult = printPatternArray(node.value, docText, indent);
    return `${keyName}: ${arrayResult}`;
  }

  if (node.type !== "ArrayExpression") {
    return docText.slice(node.start, node.end);
  }

  let result = "[\n";

  for (const [index, element] of node.elements.entries()) {
    const isLast = index === node.elements.length - 1;

    if (element.type === "StringLiteral") {
      result += `${nextIndentStr}${JSON.stringify(element.value)}`;
    } else if (element.type === "ArrayExpression") {
      result += `${nextIndentStr}${printPatternArray(element, docText, indent + 1)}`;
    } else {
      result += `${nextIndentStr}${docText.slice(element.start, element.end)}`;
    }

    if (!isLast) {
      result += ",";
    }
    result += "\n";
  }

  result += `${indentStr}]`;
  return result;
}

export function customPrint(node, docText) {
  if (hasPatternStrings(node)) {
    return printPatternArray(node, docText);
  }

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
    // Just so we don't entirely fail if I didn't handle some cases
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
