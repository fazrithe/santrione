"use client";

import { cn } from "@/lib/utils";

export interface TabItem {
  key: string;
  label: string;
  count?: number;
}

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: TabItem[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-forest-100">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "relative shrink-0 px-4 py-2.5 text-sm font-medium transition-colors",
            active === tab.key ? "text-forest-700" : "text-ink/50 hover:text-ink/80"
          )}
        >
          {tab.label}
          {typeof tab.count === "number" && (
            <span
              className={cn(
                "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                active === tab.key ? "bg-forest-100 text-forest-700" : "bg-forest-50 text-ink/40"
              )}
            >
              {tab.count}
            </span>
          )}
          {active === tab.key && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-forest-600" />}
        </button>
      ))}
    </div>
  );
}
