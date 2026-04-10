import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free", price: "$0", period: "forever",
    features: ["Browse feed", "Create posts", "Basic profile", "Up to 5 posts/day", "Community access"],
    cta: "Current Plan", highlighted: false,
  },
  {
    name: "Pro", price: "$12", period: "/month",
    features: ["Everything in Free", "Boosted visibility", "Analytics dashboard", "Pinned posts", "Custom profile badge", "Priority support"],
    cta: "Upgrade to Pro", highlighted: true,
  },
  {
    name: "Creator", price: "$29", period: "/month",
    features: ["Everything in Pro", "Tool promotion", "Featured listing", "Advanced analytics", "API access", "Team collaboration", "White-label embeds"],
    cta: "Go Creator", highlighted: false,
  },
];

const PricingPage = () => (
  <div className="max-w-4xl">
    <div className="text-center mb-8">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Choose Your Plan</h1>
      <p className="text-muted-foreground">Scale your developer presence with DevPulse</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`rounded-xl border p-6 ${
            plan.highlighted
              ? "border-primary bg-card glow-primary-lg relative"
              : "border-border bg-card"
          }`}
        >
          {plan.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              Popular
            </span>
          )}
          <h3 className="font-display font-bold text-lg text-foreground">{plan.name}</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-foreground font-mono">{plan.price}</span>
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          </div>
          <ul className="mt-5 space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <button className={`w-full mt-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            plan.highlighted
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-muted text-foreground hover:bg-muted/80"
          }`}>
            {plan.cta}
          </button>
        </motion.div>
      ))}
    </div>
  </div>
);

export default PricingPage;
