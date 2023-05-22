import dynamic from "next/dynamic";
import remarkBreaks from "remark-breaks";
import { removeHeadingLinks, splitPs } from "./hyoertext-rewrites";
import styles from "./text-preview-md.module.css";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

// function nodeIsElement(node: Root | RootContent | null): node is Element {
//   return (node as Element).tagName !== undefined;
// }

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
      remarkPlugins={[remarkBreaks]}
      rehypeRewrite={(node, index, parent) => {
        if (node.type === "root") {
          setTimeout(() => setPreviewRendered(true));
        }

        removeHeadingLinks(node, index, parent);
        splitPs(node, index, parent);
      }}
    />
  );
};
