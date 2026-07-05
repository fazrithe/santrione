"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

const titles: Record<string, string> = {
  "/": "Dasbor",
  "/santri": "SIAKAD — Data Santri",
  "/akademik": "Kelas & Jadwal Akademik",
  "/lms": "Learning Management System",
  "/absensi": "Absensi Harian",
  "/rapor": "Rapor Digital",
  "/tahfidz": "Tahfidz Al-Qur'an",
  "/ibadah": "Monitoring Ibadah",
  "/asrama": "Asrama Santri",
  "/keuangan": "Keuangan & Pembayaran",
  "/perpustakaan": "Perpustakaan",
  "/inventaris": "Inventaris",
  "/koperasi": "Koperasi Pesantren",
  "/sdm": "SDM — Pegawai & Guru",
  "/surat": "Surat Menyurat",
  "/notifikasi": "Notifikasi",
  "/ai-assistant": "Asisten AI",
};

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const title = titles[pathname] ?? "SantriOne";

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setOpen(true)} title={title} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
