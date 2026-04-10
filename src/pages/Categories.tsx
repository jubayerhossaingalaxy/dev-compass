import { categories } from "@/data/mockData";
import { motion } from "framer-motion";

const CategoriesPage = () => {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">Categories</h1>
        <p className="text-sm text-muted-foreground">Browse content by topic</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all cursor-pointer group"
          >
            <span className="text-3xl">{cat.icon}</span>
            <h3 className="font-semibold text-foreground mt-3 group-hover:text-primary transition-colors">{cat.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{cat.count.toLocaleString()} posts</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
