"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  BookMarked,
  HandHeart,
  Building2,
  Wallet,
  Library,
  Package,
  ShoppingBag,
  Contact,
  Mail,
  Sparkles,
  Bell,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const groups: NavGroup[] = [
  {
    title: "Ringkasan",
    items: [{ href: "/", label: "Dasbor", icon: LayoutDashboard }],
  },
  {
    title: "Akademik",
    items: [
      { href: "/santri", label: "SIAKAD Santri", icon: Users },
      { href: "/akademik", label: "Kelas & Jadwal", icon: GraduationCap },
      { href: "/lms", label: "LMS", icon: BookOpen },
      { href: "/absensi", label: "Absensi", icon: CalendarCheck },
      { href: "/rapor", label: "Rapor Digital", icon: ClipboardList },
      { href: "/tahfidz", label: "Tahfidz", icon: BookMarked },
      { href: "/ibadah", label: "Monitoring Ibadah", icon: HandHeart },
    ],
  },
  {
    title: "Operasional",
    items: [
      { href: "/asrama", label: "Asrama", icon: Building2 },
      { href: "/keuangan", label: "Keuangan", icon: Wallet },
      { href: "/perpustakaan", label: "Perpustakaan", icon: Library },
      { href: "/inventaris", label: "Inventaris", icon: Package },
      { href: "/koperasi", label: "Koperasi", icon: ShoppingBag },
    ],
  },
  {
    title: "Organisasi",
    items: [
      { href: "/sdm", label: "SDM", icon: Contact },
      { href: "/surat", label: "Surat Menyurat", icon: Mail },
    ],
  },
  {
    title: "Lainnya",
    items: [
      { href: "/ai-assistant", label: "Asisten AI", icon: Sparkles },
      { href: "/notifikasi", label: "Notifikasi", icon: Bell, badge: 2 },
    ],
  },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-forest-800/40 bg-forest-800 text-forest-50 transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-forest-700/60 px-5 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-1 ring-2 ring-gold-400">
              <Image src="/logo.png" alt="Logo SantriOne" width={36} height={36} className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold tracking-tight text-white">SantriOne</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-forest-200">ERP Pesantren Terpadu</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-forest-200 hover:bg-forest-700 lg:hidden"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {groups.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-300">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-forest-900/80 text-white"
                            : "text-forest-100/85 hover:bg-forest-700/60 hover:text-white"
                        )}
                      >
                        {active && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-gold-400" />
                        )}
                        <Icon size={18} className={active ? "text-gold-300" : "text-forest-300 group-hover:text-gold-300"} />
                        <span className="flex-1">{item.label}</span>
                        {item.badge ? (
                          <span className="rounded-full bg-gold-400 px-1.5 py-0.5 text-[10px] font-semibold text-forest-900">
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-forest-700/60 px-5 py-4">
          <p className="text-[11px] leading-relaxed text-forest-300">
            Ponpes Nurul Hikmah &middot; Tahun Ajaran 2026/2027
          </p>
        </div>
      </aside>
    </>
  );
}
