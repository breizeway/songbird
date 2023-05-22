import { Element, Root, RootContent } from "hast";
import dynamic from "next/dynamic";
import styles from "./text-preview-md.module.css";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

function nodeIsElement(node: Root | RootContent | null): node is Element {
  return (node as Element).tagName !== undefined;
}

interface ITextPreviewMdProps {
  source: string;
  setPreviewRendered: (previewRendered: boolean) => void;
}

export const TextPreviewMd = ({
  source,
  setPreviewRendered,
}: ITextPreviewMdProps): JSX.Element => {
  return (
    <MarkdownPreview
      className={styles.comp}
      source={source}
      rehypeRewrite={(node, index, parent) => {
        // console.log(`:::PARENT::: `, parent);
        console.log(`:::NODE::: `, node);
        if (node.type === "root") {
          setTimeout(() => setPreviewRendered(true));
        }

        // remove heading links
        if (
          nodeIsElement(node) &&
          parent &&
          nodeIsElement(parent) &&
          node.tagName === "a" &&
          /^h(1|2|3|4|5|6)/.test(parent.tagName)
        ) {
          parent.children = parent.children.slice(1);
        }

        // if (node.value !== undefined) {
        //   node.value = node.value?.replaceAll("\n", "\n\n");
        // }
        // console.log(`:::NODE.VALUE::: `, node.value);

        // split adjacent lines into multiple Ps
        // if (
        //   nodeIsElement(node) &&
        //   node.tagName === "p" &&
        //   parent?.type === "root"
        // ) {
        //   const splitPs /* lol */ = node.children.map((child) => {
        //     if (!child.value?.includes("\n")) return child;
        //     else
        //       return {
        //         ...node,
        //         children: child.value.split("\n").map((text: string, idx) => {
        //           if (idx === 0) return { ...child, value: text };
        //           return {
        //             ...node,
        //             children: [{ ...child, value: text }],
        //           };
        //         }),
        //       };
        //   });

        //   node.children = splitPs;
        // }
      }}
    />
  );
};
