import { tools, authors, trendingTags } from "@/data/mockData";
import { ToolCard } from "./ToolCard";
import { TrendingUp, Users, Hash } from "lucide-react";

export function RightPanel() {
  return (
    <aside className="w-80 flex-shrink-0 space-y-5 hidden xl:block">
      {/* Trending Tools */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="font-display font-semibold text-sm text-foreground">Trending Tools</h3>
        </div>
        <div className="divide-y divide-border">
          {tools.slice(0, 4).map((tool) => (
            <ToolCard key={tool.id} tool={tool} index={0} compact />
          ))}
        </div>
      </div>

      {/* Top Developers */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-accent" />
          <h3 className="font-display font-semibold text-sm text-foreground">Top Developers</h3>
        </div>
        <div className="space-y-3">
          {authors.slice(0, 4).map((author, i) => (
            <div key={author.id} className="flex items-center gap-3 group cursor-pointer">
              <span className="text-xs text-muted-foreground font-mono w-4">{i + 1}</span>
              <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">{author.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{author.name}</p>
                <p className="text-xs text-muted-foreground">{author.reputation.toLocaleString()} rep</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hot Tags */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Hash className="h-4 w-4 text-accent-orange" />
          <h3 className="font-display font-semibold text-sm text-foreground">Hot Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <span
              key={tag.name}
              className="px-2.5 py-1 rounded-full bg-muted text-xs font-mono text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
            >
              #{tag.name} <span className="text-muted-foreground/50">{tag.count}</span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
