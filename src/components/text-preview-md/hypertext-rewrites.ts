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

export const extractChords = (
  node: Root | RootContent,
  index: number | null,
  parent: Root | Element | null
) => {
  const test = "|A|You not these words |B|might |C| lo|D|se|d|";
  // 1 or more characters given that the characters are (1) between 2 "|", and (2) are not "|"
  const chordExpression = /(\|{1}[^\|]+\|{1})/;
  const chordOrSpaceExpression = /(\|{1}[^\|]+\|{1}|\s)/;
  const wordWithChordExp =
    /(?<=(?:^|\s))([^\s\|]*\|{1}\S+\|{1}[^\s\|]*)+(?=(?:\s|$))/;

  const site =
    "https://stackoverflow.com/questions/57856398/javascript-split-with-regular-expression-return-empty-values";
  if (
    parent &&
    parent.type === "element" &&
    ["p", "em", "strong"].includes(parent.tagName) &&
    node.type === "text" &&
    chordExpression.test(node.value)
  ) {
    const newWords = node.value
      .split(chordOrSpaceExpression)
      .filter((str) => !!str)
      .reduce(
        (acc, str, idx, arr) => {
          if (str !== " " && (arr[idx - 1] ?? "") !== " ") {
            return [
              ...acc.slice(0, acc.length - 1),
              acc[acc.length - 1].concat(str),
            ];
          } else return [...acc, str];
        },
        [""]
      )
      .reduce(
        (acc, str, idx, arr) => {
          if (
            !chordExpression.test(arr[idx]) &&
            !chordExpression.test(arr[idx - 1] ?? "")
          ) {
            return [
              ...acc.slice(0, acc.length - 1),
              acc[acc.length - 1].concat(str),
            ];
          } else return [...acc, str];
        },
        [""]
      );
    console.log(`:::NEWWORDS::: `, newWords);

    // const replacementNodes: ElementContent[] = [];
    // const skipIndices: number[] = [];
    // splitValue.forEach((str, idx) => {
    //   if (chordExpression.test(str)) {
    //     skipIndices.push(idx + 1);
    //     replacementNodes.push(
    //       newElementNode(
    //         "span",
    //         [
    //           newElementNode(
    //             "span",
    //             [
    //               newElementNode("strong", [
    //                 newTextNode(str.replaceAll("|", "")),
    //               ]),
    //             ],
    //             { className: styles.chord }
    //           ),
    //           newTextNode(splitValue[idx + 1].split(" ")[0]),
    //         ],
    //         { className: styles.chordWrapper }
    //       )
    //     );
    //   } else if (skipIndices.includes(idx))
    //     replacementNodes.push(newTextNode(str.split(" ").slice(1).join(" ")));
    //   else replacementNodes.push(newTextNode(str));
    // });

    // parent.children.splice(index ?? 0, 1, ...replacementNodes);
  }
};

export const extractTabs = (
  node: Root | RootContent,
  index: number | null,
  parent: Root | Element | null
) => {
  // 1 or more characters given that the characters are (1) between 2 "|", and (2) are not "|"
  const chordExpression = /(\|[^\|]+\|)/;

  if (
    parent &&
    parent.type === "element" &&
    ["p", "em", "strong"].includes(parent.tagName) &&
    node.type === "text" &&
    chordExpression.test(node.value)
  ) {
    const splitValue = node.value.split(chordExpression);

    const replacementNodes: ElementContent[] = [];
    const skipIndices: number[] = [];
    splitValue.forEach((str, idx) => {
      if (chordExpression.test(str)) {
        skipIndices.push(idx + 1);
        replacementNodes.push(
          newElementNode(
            "span",
            [
              newElementNode(
                "span",
                [
                  newElementNode("strong", [
                    newTextNode(str.replaceAll("|", "")),
                  ]),
                ],
                { className: styles.chord }
              ),
              newTextNode(splitValue[idx + 1].split(" ")[0]),
            ],
            { className: styles.chordWrapper }
          )
        );
      } else if (skipIndices.includes(idx))
        replacementNodes.push(newTextNode(str.split(" ").slice(1).join(" ")));
      else replacementNodes.push(newTextNode(str));
    });

    // const chordWrapper = newElementNode(
    //         "span",
    //         [newElementNode("strong", [newTextNode(str.replaceAll("|", ""))])],
    //         { class: styles.chord }
    //       )
    parent.children.splice(index ?? 0, 1, ...replacementNodes);
  }
};
