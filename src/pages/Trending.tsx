import { posts } from "@/data/mockData";
import { PostCard } from "@/components/PostCard";
import { Flame } from "lucide-react";

const TrendingPage = () => {
  const sorted = [...posts].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="h-5 w-5 text-accent-orange" />
          <h1 className="font-display text-2xl font-bold text-foreground">Trending</h1>
        </div>
        <p className="text-sm text-muted-foreground">Most popular posts in the last 24 hours</p>
      </div>
      <div className="space-y-4">
        {sorted.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;
