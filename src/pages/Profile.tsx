import { authors } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { MapPin, Link as LinkIcon, Github, Award } from "lucide-react";

const ProfilePage = () => {
  const user = authors[0];

  return (
    <div className="max-w-4xl">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start gap-5">
          <div className="h-20 w-20 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-primary">{user.avatar}</span>
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
            <p className="text-sm text-muted-foreground mt-2">Full-stack developer passionate about TypeScript, system design, and developer tooling.</p>

            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />San Francisco</span>
              <span className="flex items-center gap-1"><Github className="h-3.5 w-3.5" />sarahdev</span>
              <span className="flex items-center gap-1"><LinkIcon className="h-3.5 w-3.5" />sarahchen.dev</span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <div className="text-center px-4 py-2 rounded-lg bg-muted">
                <p className="text-lg font-bold text-foreground font-mono">{user.reputation.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Reputation</p>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-muted">
                <p className="text-lg font-bold text-foreground font-mono">142</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-muted">
                <p className="text-lg font-bold text-foreground font-mono">1.2k</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-muted">
                <p className="text-lg font-bold text-foreground font-mono">89</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Award className="h-4 w-4 text-accent-orange" />
              {user.badges.map((badge) => (
                <Badge key={badge} className="bg-accent-orange/10 text-accent-orange border-accent-orange/20 text-xs">{badge}</Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-3">
              {["TypeScript", "React", "Node.js", "System Design", "DevOps"].map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs font-mono">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
