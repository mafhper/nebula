import { useCallback, useState } from 'react';

interface SnippetPanelProps {
  snippet: string;
}

export function SnippetPanel({ snippet }: SnippetPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [snippet]);

  return (
    <div className="snippet-panel">
      <div>
        <p>React snippet</p>
        <button
          type="button"
          className="copy-button"
          aria-label="Copy snippet"
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="snippet-wrapper">
        <pre aria-label="React usage snippet">{snippet}</pre>
      </div>
    </div>
  );
}
