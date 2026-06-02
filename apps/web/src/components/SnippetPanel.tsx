import { useCallback, useState } from 'react';

interface SnippetPanelProps {
  snippet: string;
}

function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    return Promise.resolve();
  } finally {
    document.body.removeChild(textarea);
  }
}

export function SnippetPanel({ snippet }: SnippetPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    copyToClipboard(snippet).then(() => {
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
