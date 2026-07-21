"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function InsightMarkdownBody({ content }) {
  return (
    <div className="rt-article-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content ? String(content).trim() : ""}
      </ReactMarkdown>
    </div>
  );
}
