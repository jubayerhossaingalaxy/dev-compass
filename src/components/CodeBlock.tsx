import { useState } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  collapsible?: boolean;
}

export function CodeBlock({ code, language, collapsible = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(!collapsible);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card mt-3">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <span className="text-xs font-mono text-muted-foreground uppercase">{language}</span>
        <div className="flex items-center gap-2">
          {collapsible && (
            <button onClick={() => setExpanded(!expanded)} className="text-muted-foreground hover:text-foreground transition-colors">
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          )}
          <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="overflow-x-auto">
          <pre className="p-4 text-sm font-mono leading-relaxed">
            <code>
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="select-none text-muted-foreground/40 w-8 text-right mr-4 flex-shrink-0">{i + 1}</span>
                  <span className="text-foreground">{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
