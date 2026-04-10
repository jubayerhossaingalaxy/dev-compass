import { ArrowBigUp, Star, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Tool } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export function ToolCard({ tool, index, compact = false }: { tool: Tool; index: number; compact?: boolean }) {
  const [upvoted, setUpvoted] = useState(false);
  const [votes, setVotes] = useState(tool.upvotes);

  const handleUpvote = () => {
    setUpvoted(!upvoted);
    setVotes(upvoted ? tool.upvotes : tool.upvotes + 1);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 py-2.5 group cursor-pointer">
        <span className="text-lg">{tool.logo}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{tool.name}</p>
          <p className="text-xs text-muted-foreground truncate">{tool.description.slice(0, 50)}...</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <ArrowBigUp className="h-3.5 w-3.5" />
          {(votes / 1000).toFixed(1)}k
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all duration-200 group"
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">
          {tool.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{tool.name}</h3>
            <a href={tool.website} target="_blank" rel="noopener" className="text-muted-foreground hover:text-foreground">
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{tool.description}</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-accent-orange fill-accent-orange" />
              <span className="text-xs font-medium text-foreground">{tool.rating}</span>
              <span className="text-xs text-muted-foreground">({tool.reviews})</span>
            </div>
            <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {tool.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-muted-foreground">#{tag}</span>
            ))}
          </div>
        </div>
        <button
          onClick={handleUpvote}
          className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg border transition-all ${
            upvoted ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
          }`}
        >
          <ArrowBigUp className="h-5 w-5" fill={upvoted ? "currentColor" : "none"} />
          <span className="text-xs font-semibold font-mono">{votes}</span>
        </button>
      </div>
    </motion.div>
  );
}
