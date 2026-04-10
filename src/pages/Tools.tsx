import { tools } from "@/data/mockData";
import { ToolCard } from "@/components/ToolCard";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

const categories = ["All", "AI Tools", "Runtime", "Build Tools", "Database", "Deployment", "Frameworks"];

const ToolsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? tools : tools.filter((t) => t.category === activeCategory);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">Developer Tools</h1>
        <p className="text-sm text-muted-foreground">Discover, review, and upvote the best developer tools</p>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tools..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
