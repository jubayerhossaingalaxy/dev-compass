import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Bot, Send, RefreshCw, CheckCircle2, XCircle, Clock, Facebook, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const statusConfig = {
  posted: { icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10", label: "Posted" },
  failed: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Failed" },
  pending: { icon: Clock, color: "text-accent-orange", bg: "bg-accent-orange/10", label: "Pending" },
};

const AutoPostPage = () => {
  const [posting, setPosting] = useState(false);
  const [postCount, setPostCount] = useState(1);
  const { toast } = useToast();

  const { data: posts, refetch, isLoading } = useQuery({
    queryKey: ["auto-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("auto_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });

  const handlePost = async () => {
    setPosting(true);
    try {
      const { data, error } = await supabase.functions.invoke("auto-post-facebook", {
        body: { count: postCount },
      });
      if (error) throw error;
      toast({
        title: "Auto Post Complete!",
        description: `${data.results?.filter((r: any) => r.success).length || 0}/${data.total} posts published successfully.`,
      });
      refetch();
    } catch (err: any) {
      toast({
        title: "Post Failed",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setPosting(false);
    }
  };

  const stats = {
    total: posts?.length || 0,
    posted: posts?.filter((p) => p.status === "posted").length || 0,
    failed: posts?.filter((p) => p.status === "failed").length || 0,
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Bot className="h-5 w-5 text-primary" />
          <h1 className="font-display text-2xl font-bold text-foreground">AI Auto Post</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          AI researches trending dev topics and auto-posts to Facebook • 5 posts/day scheduled
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-border bg-card p-5 mb-5">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Facebook className="h-5 w-5 text-accent-blue" />
            <span className="text-sm font-medium text-foreground">Facebook Page Connected</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground">Posts:</label>
            <select
              value={postCount}
              onChange={(e) => setPostCount(Number(e.target.value))}
              className="bg-muted rounded px-2 py-1 text-sm text-foreground border-0"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handlePost}
            disabled={posting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 glow-primary"
          >
            {posting ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {posting ? "Generating & Posting..." : "Post Now"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "Total Posts", value: stats.total, icon: Zap, color: "text-foreground" },
          { label: "Published", value: stats.posted, icon: CheckCircle2, color: "text-primary" },
          { label: "Failed", value: stats.failed, icon: XCircle, color: "text-destructive" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
            <p className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Schedule Info */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Daily Auto-Post Schedule (UTC)</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {["8:00 AM", "11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"].map((time) => (
            <span key={time} className="px-3 py-1 rounded-full bg-primary/10 text-xs font-mono text-primary">
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Post History */}
      <h2 className="font-display font-semibold text-foreground mb-3">Post History</h2>
      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground text-sm">Loading...</div>
      ) : !posts?.length ? (
        <div className="text-center py-10 rounded-xl border border-border bg-card">
          <Bot className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No posts yet. Click "Post Now" to generate your first AI post!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post, i) => {
            const cfg = statusConfig[post.status as keyof typeof statusConfig] || statusConfig.pending;
            const StatusIcon = cfg.icon;
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`h-8 w-8 rounded-full ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                    <StatusIcon className={`h-4 w-4 ${cfg.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground truncate">{post.title}</h3>
                      <Badge className={`${cfg.bg} ${cfg.color} text-xs border-0`}>{cfg.label}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {post.topic && <span>Topic: {post.topic}</span>}
                      <span>{new Date(post.created_at).toLocaleString()}</span>
                      {post.facebook_post_id && (
                        <a
                          href={`https://facebook.com/${post.facebook_post_id}`}
                          target="_blank"
                          rel="noopener"
                          className="text-accent-blue hover:underline"
                        >
                          View on Facebook →
                        </a>
                      )}
                    </div>
                    {post.error_message && (
                      <p className="text-xs text-destructive mt-1 truncate">Error: {post.error_message}</p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-1.5 mt-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs font-mono text-muted-foreground">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AutoPostPage;
