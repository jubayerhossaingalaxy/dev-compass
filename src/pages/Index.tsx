import { useState } from "react";
import { posts } from "@/data/mockData";
import { PostCard } from "@/components/PostCard";
import { FeedHeader } from "@/components/FeedHeader";
import { RightPanel } from "@/components/RightPanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("trending");

  const sortedPosts = [...posts].sort((a, b) => {
    if (activeTab === "latest") return 0;
    return b.score - a.score;
  });

  return (
    <div className="flex gap-6 max-w-full">
      <div className="flex-1 min-w-0">
        <FeedHeader activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="space-y-4">
          {sortedPosts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
      <RightPanel />
    </div>
  );
};

export default Index;
