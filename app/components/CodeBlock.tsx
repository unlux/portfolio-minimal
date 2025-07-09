"use client";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-wasm";
import "prismjs/components/prism-yaml";

import { CopyToClipboard } from "./CopyToClipboard";

const CodeBlock = ({ block }: { block: any }) => {
  const code = block.properties.title[0][0];
  const language = block.properties.language[0][0].toLowerCase();
  const supportedLanguage = languages[language] ? language : "javascript";
  const highlightedCode = highlight(
    code,
    languages[supportedLanguage],
    language
  );

  return (
    <div className="relative my-4 text-sm">
      <pre className="language-ts">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
      <div className="absolute top-2 right-2">
        <CopyToClipboard text={code} />
      </div>
    </div>
  );
};

export default CodeBlock;
