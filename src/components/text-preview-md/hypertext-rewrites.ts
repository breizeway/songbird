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

/**
 * Chord Groups
 */

// |A|You not these words |B|might |C| lo|D|se|d|
// 1 or more characters given that the characters are (1) between 2 single "|"s, and (2) are not "|"
const chordExpressionBase = /\|{1}[^\|]+\|{1}/;
const chordExpression = new RegExp("(" + chordExpressionBase.source + ")");
// chordExpression OR whitespace
const chordOrSpaceExpression = new RegExp(
  "(" + chordExpressionBase.source + /|\s/.source + ")"
);
// regex that got close to identifying chords groups, but you disallowed spaces
// /(?<=(?:^|\s))([^\s\|]*\|{1}\S+\|{1}[^\s\|]*)+(?=(?:\s|$))/;
const stringNotEmpty = (str: string) => !!str;

const groupChordsByWord = (
  acc: string[],
  str: string,
  idx: number,
  arr: string[]
) => {
  if (str !== " " && (arr[idx - 1] ?? "") !== " ") {
    return [...acc.slice(0, acc.length - 1), acc[acc.length - 1].concat(str)];
  } else return [...acc, str];
};

const groupNonChordText = (
  acc: string[],
  str: string,
  idx: number,
  arr: string[]
) => {
  if (
    !chordExpression.test(arr[idx]) &&
    !chordExpression.test(arr[idx - 1] ?? "")
  ) {
    return [...acc.slice(0, acc.length - 1), acc[acc.length - 1].concat(str)];
  } else return [...acc, str];
};

const newChord = (chordText: string): ElementContent =>
  newElementNode(
    "span",
    [newElementNode("strong", [newTextNode(chordText.replaceAll("|", ""))])],
    { className: styles.chord }
  );

const newChordGroup = (textWithChords: string): ElementContent =>
  newElementNode(
    "span",
    textWithChords
      .split(chordExpression)
      .filter(stringNotEmpty)
      .map((str) => {
        if (chordExpression.test(str)) {
          return newChord(str);
        } else {
          return newTextNode(str);
        }
      }),
    { className: styles.chordGroup }
  );

export const extractChords = (
  node: Root | RootContent,
  index: number | null,
  parent: Root | Element | null
) => {
  if (
    parent &&
    parent.type === "element" &&
    ["p", "em", "strong"].includes(parent.tagName) &&
    node.type === "text" &&
    chordExpression.test(node.value)
  ) {
    const splitNodeValue = node.value
      .split(chordOrSpaceExpression)
      .filter(stringNotEmpty)
      .reduce(groupChordsByWord, [""])
      .reduce(groupNonChordText, [""])
      .map((str) => {
        if (chordExpression.test(str)) {
          return newChordGroup(str);
        } else {
          return newTextNode(str);
        }
      });

    parent.children.splice(index ?? 0, 1, ...splitNodeValue);
  }
};
