import { useState } from "react";
import { ArrowBigUp, ArrowBigDown, MessageSquare, Bookmark, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Post } from "@/data/mockData";
import { CodeBlock } from "./CodeBlock";
import { Badge } from "@/components/ui/badge";

const typeColors: Record<string, string> = {
  snippet: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
  tutorial: "bg-primary/10 text-primary border-primary/20",
  discussion: "bg-accent-orange/10 text-accent-orange border-accent-orange/20",
  tool_review: "bg-accent-pink/10 text-accent-pink border-accent-pink/20",
  announcement: "bg-accent/10 text-accent border-accent/20",
};

export function PostCard({ post, index }: { post: Post; index: number }) {
  const [votes, setVotes] = useState(post.upvotes - post.downvotes);
  const [voted, setVoted] = useState<"up" | "down" | null>(null);

  const handleVote = (dir: "up" | "down") => {
    if (voted === dir) {
      setVoted(null);
      setVotes(post.upvotes - post.downvotes);
    } else {
      setVoted(dir);
      setVotes(post.upvotes - post.downvotes + (dir === "up" ? 1 : -1));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all duration-200 group"
    >
      <div className="flex gap-4">
        {/* Vote column */}
        <div className="flex flex-col items-center gap-1 pt-1">
          <button
            onClick={() => handleVote("up")}
            className={`p-1 rounded transition-colors ${voted === "up" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <ArrowBigUp className="h-6 w-6" fill={voted === "up" ? "currentColor" : "none"} />
          </button>
          <span className={`text-sm font-semibold font-mono ${voted ? "text-primary" : "text-foreground"}`}>{votes}</span>
          <button
            onClick={() => handleVote("down")}
            className={`p-1 rounded transition-colors ${voted === "down" ? "text-destructive" : "text-muted-foreground hover:text-foreground"}`}
          >
            <ArrowBigDown className="h-6 w-6" fill={voted === "down" ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColors[post.type]}`}>
              {post.type.replace("_", " ")}
            </span>
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">{post.author.avatar}</span>
              </div>
              <span className="text-xs text-muted-foreground">{post.author.name}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{post.createdAt}</span>
            </div>
          </div>

          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-1.5 cursor-pointer">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.content}</p>

          {post.code && post.codeLanguage && (
            <CodeBlock code={post.code} language={post.codeLanguage} collapsible />
          )}

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-mono bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-3 text-muted-foreground">
            <button className="flex items-center gap-1.5 text-xs hover:text-foreground transition-colors">
              <MessageSquare className="h-4 w-4" />
              {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-xs hover:text-foreground transition-colors">
              <Bookmark className="h-4 w-4" />
              Save
            </button>
            <button className="flex items-center gap-1.5 text-xs hover:text-foreground transition-colors">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
