import { Settings as SettingsIcon } from "lucide-react";

const SettingsPage = () => (
  <div className="max-w-2xl">
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <SettingsIcon className="h-5 w-5 text-muted-foreground" />
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
      </div>
    </div>
    <div className="space-y-4">
      {[
        { label: "Display Name", value: "Sarah Chen" },
        { label: "Email", value: "sarah@example.com" },
        { label: "Username", value: "@sarahdev" },
      ].map((field) => (
        <div key={field.label} className="rounded-lg border border-border bg-card p-4">
          <label className="text-xs text-muted-foreground uppercase tracking-wide">{field.label}</label>
          <input
            type="text"
            defaultValue={field.value}
            className="w-full mt-1 bg-transparent text-foreground text-sm focus:outline-none"
          />
        </div>
      ))}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
        <div>
          <p className="text-sm font-medium text-foreground">Dark Mode</p>
          <p className="text-xs text-muted-foreground">Toggle dark/light theme</p>
        </div>
        <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer">
          <div className="h-5 w-5 rounded-full bg-primary-foreground absolute right-0.5 top-0.5" />
        </div>
      </div>
    </div>
  </div>
);

export default SettingsPage;
