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
  // const transformSource = (source: string) => {
  //   const lines = source.split("\n");
  // }

  return (
    <MarkdownPreview
      className={styles.comp}
      source={source}
      rehypeRewrite={(node, index, parent) => {
        // console.log(`:::NODE::: `, node);
        if (node.type === "root") {
          setTimeout(() => setPreviewRendered(true));
        }

        // remove heading links
        if (
          nodeIsElement(node) &&
          nodeIsElement(parent) &&
          node.tagName === "a" &&
          parent &&
          /^h(1|2|3|4|5|6)/.test(parent.tagName)
        ) {
          parent.children = parent.children.slice(1);
        }
      }}
    />
  );
};
