import { Element, ElementContent, Root, RootContent, Text } from "hast";

const isBreak = (childNode: ElementContent) =>
  childNode.type === "element" && childNode.tagName === "br";
const isNewLine = (childNode: ElementContent) =>
  childNode.type === "text" && childNode.value === "\n";
const isSingleLineText = (childNode: ElementContent) =>
  childNode.type === "text" && !childNode.value.includes("\n");
const newPFromText = (text: Text): ElementContent => {
  return {
    type: "element",
    tagName: "p",
    properties: {},
    children: [text],
    position: {
      start: {
        line: 0,
        column: 0,
        offset: 0,
      },
      end: {
        line: 0,
        column: 0,
        offset: 0,
      },
    },
  };
};

export const removeHeadingLinks = (
  node: Root | RootContent,
  _: number | null,
  parent: Root | Element | null
) => {
  if (
    parent &&
    parent.type === "element" &&
    node.type === "element" &&
    node.tagName === "a" &&
    /^h(1|2|3|4|5|6)/.test(parent.tagName)
  ) {
    parent.children = parent.children.slice(1);
  }
};

export const splitPs = (
  node: Root | RootContent,
  _: number | null,
  __: Root | Element | null
) => {
  if (node.type === "element" && node.tagName === "p") {
    // console.log(`:::NODE::: `, node);
    const newChildren: ElementContent[] = [];
    const groupIndexes: number[] = [];
    node.children.forEach((child, idx) => {
      if (
        idx <= node.children.length - 3 &&
        isBreak(child) &&
        isNewLine(node.children[idx + 1]) &&
        isSingleLineText(node.children[idx + 2])
        // && (!node.children[idx + 3] || isBreak(node.children[idx + 3]))
      ) {
        groupIndexes.push(idx, idx + 1, idx + 2);
        newChildren.push(newPFromText(node.children[idx + 2] as Text));
        // console.log(`:::group-IDX::: `, idx);
      } else if (!groupIndexes.includes(idx)) {
        // console.log(`:::single-IDX::: `, idx);
        newChildren.push({ ...child });
      }
    });
    console.log(`:::OLDCHILDREN::: `, node.children);
    console.log(`:::NEWCHILDREN::: `, newChildren);
    node.children = newChildren;
  }
};
