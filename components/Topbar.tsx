"use client";

import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import { notifications } from "@/lib/dummy-data";

export function Topbar({ onMenu, title }: { onMenu: () => void; title: string }) {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-forest-100 bg-paper/90 px-4 py-3 backdrop-blur sm:px-6">
      <button
        onClick={onMenu}
        className="rounded-md p-2 text-forest-700 hover:bg-forest-50 lg:hidden"
        aria-label="Buka menu"
      >
        <Menu size={20} />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-xl font-semibold text-ink">{title}</h1>
      </div>

      <div className="hidden items-center gap-2 rounded-full border border-forest-100 bg-white px-3.5 py-2 text-sm text-ink/60 shadow-soft md:flex md:w-72">
        <Search size={16} />
        <input
          type="text"
          placeholder="Cari santri, invoice, kelas..."
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
      </div>

      <button className="relative rounded-full border border-forest-100 bg-white p-2.5 text-forest-700 shadow-soft hover:bg-forest-50">
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-forest-900">
            {unread}
          </span>
        )}
      </button>

      <button className="flex items-center gap-2 rounded-full border border-forest-100 bg-white py-1.5 pl-1.5 pr-3 shadow-soft hover:bg-forest-50">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-600 text-xs font-semibold text-white">
          AR
        </span>
        <span className="hidden text-left text-sm leading-tight sm:block">
          <span className="block font-medium text-ink">Admin Pesantren</span>
          <span className="block text-xs text-ink/50">Ponpes Nurul Hikmah</span>
        </span>
        <ChevronDown size={14} className="hidden text-ink/40 sm:block" />
      </button>
    </header>
  );
}
