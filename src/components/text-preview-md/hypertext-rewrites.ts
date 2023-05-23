import {
  Element,
  ElementContent,
  Properties,
  Root,
  RootContent,
  Text,
} from "hast";
import styles from "./text-preview-md.module.css";

const isBreak = (childNode: ElementContent) =>
  childNode.type === "element" && childNode.tagName === "br";

const isNewLine = (childNode: ElementContent) =>
  childNode.type === "text" && childNode.value === "\n";

const newElementNode = (
  tagName: string,
  children: ElementContent[] | undefined = [],
  properties: Properties | undefined = {}
): ElementContent => {
  return {
    type: "element",
    tagName,
    properties,
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

const newTextNode = (value: string | undefined = ""): Text => ({
  type: "text",
  value,
});

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

export const splitPs /* lol */ = (
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

        newChildren.push(newElementNode("p", newPChildren));
      } else if (!childIndicesToExtract.includes(idx)) {
        newChildren.push(child);
      }
    });
    node.children = newChildren;
  }
};

export const extractTabs = (
  node: Root | RootContent,
  index: number | null,
  parent: Root | Element | null
) => {
  // 1 or more characters given that the characters are (1) between 2 "|", and (2) are not "|"
  const tabExpression = /(\|[^\|]+\|)/;

  if (
    parent &&
    parent.type === "element" &&
    ["p", "em", "strong"].includes(parent.tagName) &&
    node.type === "text" &&
    tabExpression.test(node.value)
  ) {
    const splitValue = node.value.split(tabExpression);

    const splitNode = splitValue.map((str) => {
      if (tabExpression.test(str)) {
        return newElementNode(
          "span",
          [newElementNode("strong", [newTextNode(str.replaceAll("|", ""))])],
          { class: styles.tab }
        );
      } else return newTextNode(str);
    });
    parent.children.splice(index ?? 0, 1, ...splitNode);
  }
};
