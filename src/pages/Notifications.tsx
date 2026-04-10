import { Bell, ArrowBigUp, MessageSquare, UserPlus, Star, Flame } from "lucide-react";
import { motion } from "framer-motion";

const notifications = [
  { id: "1", type: "upvote", message: "Alex Rivera upvoted your post", detail: "The Elegant Way to Handle Errors in TypeScript", time: "2m ago", icon: ArrowBigUp },
  { id: "2", type: "comment", message: "Maya Johnson commented on your post", detail: "Great approach! I've been using something similar...", time: "15m ago", icon: MessageSquare },
  { id: "3", type: "follow", message: "Kai Nakamura started following you", detail: "", time: "1h ago", icon: UserPlus },
  { id: "4", type: "review", message: "New review on Cursor", detail: "⭐⭐⭐⭐⭐ Best AI code editor I've used", time: "3h ago", icon: Star },
  { id: "5", type: "trending", message: "Your post is trending!", detail: "Building a Zero-Downtime Deployment Pipeline", time: "5h ago", icon: Flame },
];

const NotificationsPage = () => (
  <div className="max-w-2xl">
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <Bell className="h-5 w-5 text-primary" />
        <h1 className="font-display text-2xl font-bold text-foreground">Notifications</h1>
      </div>
      <p className="text-sm text-muted-foreground">Stay updated with your activity</p>
    </div>
    <div className="space-y-2">
      {notifications.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-lg border border-border bg-card p-4 hover:border-primary/20 transition-colors cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <n.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{n.message}</p>
              {n.detail && <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.detail}</p>}
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">{n.time}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default NotificationsPage;
