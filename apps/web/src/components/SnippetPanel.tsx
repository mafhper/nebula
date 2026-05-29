interface SnippetPanelProps {
  snippet: string;
}

export function SnippetPanel({ snippet }: SnippetPanelProps) {
  return (
    <div className="snippet-panel">
      <div>
        <p>React snippet</p>
        <span>Copy-ready component shape</span>
      </div>
      <pre aria-label="React usage snippet">{snippet}</pre>
    </div>
  );
}
