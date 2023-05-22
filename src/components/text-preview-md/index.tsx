import dynamic from "next/dynamic";
import remarkBreaks from "remark-breaks";
import { extractTabs, removeHeadingLinks, splitPs } from "./hypertext-rewrites";
import styles from "./text-preview-md.module.css";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

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
        extractTabs(node, index, parent);
        splitPs(node, index, parent);
      }}
    />
  );
};
