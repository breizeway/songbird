import { Element, ElementContent, Root, RootContent } from "hast";

const isBreak = (childNode: ElementContent) =>
  childNode.type === "element" && childNode.tagName === "br";
const isNewLine = (childNode: ElementContent) =>
  childNode.type === "text" && childNode.value === "\n";
const newPWithChildren = (children: ElementContent[]): ElementContent => {
  return {
    type: "element",
    tagName: "p",
    properties: {},
    children,
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
    const oldChildren = [...node.children];
    const newChildren: ElementContent[] = [];
    const childIndicesToExtract: number[] = [];

    oldChildren.forEach((child, idx) => {
      if (
        idx <= oldChildren.length - 3 &&
        isBreak(child) &&
        isNewLine(oldChildren[idx + 1]) &&
        !isBreak(oldChildren[idx + 2]) &&
        !isNewLine(oldChildren[idx + 2])
      ) {
        childIndicesToExtract.push(idx, idx + 1);

        const newPChildren: ElementContent[] = [];
        let newPChildIdx = idx + 2;
        while (
          !!oldChildren[newPChildIdx] &&
          !isBreak(oldChildren[newPChildIdx])
        ) {
          childIndicesToExtract.push(newPChildIdx);
          newPChildren.push(oldChildren[newPChildIdx]);
          newPChildIdx++;
        }

        newChildren.push(newPWithChildren(newPChildren));
      } else if (!childIndicesToExtract.includes(idx)) {
        newChildren.push(child);
      }
    });
    node.children = newChildren;
  }
};
