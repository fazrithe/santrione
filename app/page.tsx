import Link from "next/link";
import {
  Users, CalendarCheck, Wallet, FileWarning, ArrowUpRight, BookMarked,
  Building2, Library, Mail, ShoppingBag, Contact, Sparkles,
} from "lucide-react";
import { Card, CardHeader, StatCard, Badge } from "@/components/ui";
import { AttendanceChart } from "@/components/charts/AttendanceChart";
import { RevenueChart } from "@/components/charts/RevenueChart";
import {
  dashboardStats, notifications, letters, memorizationProgress, invoices,
} from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const quickLinks = [
  { href: "/santri", label: "SIAKAD Santri", icon: Users },
  { href: "/asrama", label: "Asrama", icon: Building2 },
  { href: "/tahfidz", label: "Tahfidz", icon: BookMarked },
  { href: "/keuangan", label: "Keuangan", icon: Wallet },
  { href: "/perpustakaan", label: "Perpustakaan", icon: Library },
  { href: "/koperasi", label: "Koperasi", icon: ShoppingBag },
  { href: "/sdm", label: "SDM", icon: Contact },
  { href: "/surat", label: "Surat Menyurat", icon: Mail },
];

export default function DashboardPage() {
  const overdueInvoices = invoices.filter((i) => i.status === "overdue").length;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="lattice-bg relative overflow-hidden rounded-2xl border border-forest-800 bg-gradient-to-br from-forest-800 via-forest-700 to-forest-800 px-6 py-8 text-white sm:px-8">
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Assalamu&rsquo;alaikum, Admin Pesantren
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              Papan Amal hari ini, Sabtu 5 Juli 2026
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-forest-100/90">
              Kehadiran santri hari ini <span className="font-semibold text-white">{dashboardStats.attendanceRateToday}%</span>,
              {" "}{overdueInvoices} tagihan lewat jatuh tempo, dan {dashboardStats.pendingLetters} surat menunggu persetujuan.
              Semua modul tersinkron otomatis lintas cabang.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="font-mono text-2xl font-semibold text-gold-300">{dashboardStats.totalStudents.toLocaleString("id-ID")}</p>
              <p className="text-xs text-forest-100/80">Santri aktif</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="font-mono text-2xl font-semibold text-gold-300">{dashboardStats.activeDormitories}</p>
              <p className="text-xs text-forest-100/80">Asrama beroperasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Santri Aktif"
          value={dashboardStats.totalStudents.toLocaleString("id-ID")}
          icon={Users}
          trend="+18 santri baru bulan ini"
        />
        <StatCard
          label="Kehadiran Hari Ini"
          value={`${dashboardStats.attendanceRateToday}%`}
          icon={CalendarCheck}
          trend="Naik 1.2% dari kemarin"
          accent="gold"
        />
        <StatCard
          label="Pendapatan Bulan Ini"
          value={formatCurrency(dashboardStats.revenueThisMonth)}
          icon={Wallet}
          trend="Target tercapai 92%"
        />
        <StatCard
          label="Tagihan Tertunggak"
          value={`${dashboardStats.outstandingInvoices} invoice`}
          icon={FileWarning}
          trend={`${overdueInvoices} sudah lewat jatuh tempo`}
          trendUp={false}
          accent="gold"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Tren Kehadiran Mingguan" subtitle="Persentase santri hadir per hari, seluruh kelas" />
          <div className="px-2 pb-4 pt-2 sm:px-4">
            <AttendanceChart />
          </div>
        </Card>

        <Card>
          <CardHeader title="Aktivitas Terbaru" subtitle="Notifikasi lintas modul" />
          <ul className="divide-y divide-forest-50">
            {notifications.slice(0, 4).map((n) => (
              <li key={n.id} className="flex gap-3 px-5 py-3.5">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-forest-100" : "bg-gold-400"}`} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{n.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-ink/55">{n.body}</p>
                  <p className="mt-1 text-[11px] text-ink/40">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/notifikasi"
            className="flex items-center justify-center gap-1 border-t border-forest-50 py-3 text-sm font-medium text-forest-700 hover:bg-forest-50"
          >
            Lihat semua notifikasi <ArrowUpRight size={14} />
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Pendapatan per Kategori" subtitle="Enam bulan terakhir, dalam juta rupiah" />
          <div className="px-2 pb-4 pt-2 sm:px-4">
            <RevenueChart />
          </div>
        </Card>

        <Card>
          <CardHeader title="Capaian Tahfidz Minggu Ini" subtitle="Sampel progres santri" />
          <ul className="divide-y divide-forest-50">
            {memorizationProgress.slice(0, 4).map((m) => (
              <li key={m.studentName} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{m.studentName}</p>
                  <p className="text-xs text-ink/50">{m.className} &middot; {m.surahCurrent}</p>
                </div>
                <Badge status={m.status} />
              </li>
            ))}
          </ul>
          <Link
            href="/tahfidz"
            className="flex items-center justify-center gap-1 border-t border-forest-50 py-3 text-sm font-medium text-forest-700 hover:bg-forest-50"
          >
            Lihat semua progres <ArrowUpRight size={14} />
          </Link>
        </Card>
      </div>

      {/* Quick links */}
      <Card>
        <CardHeader title="Akses Cepat Modul" subtitle="Lompat langsung ke modul operasional" />
        <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
          {quickLinks.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group flex flex-col items-center gap-2 rounded-xl border border-forest-50 bg-forest-50/40 px-3 py-4 text-center transition-colors hover:border-gold-300 hover:bg-gold-50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-forest-600 shadow-soft group-hover:text-gold-600">
                <q.icon size={18} />
              </span>
              <span className="text-xs font-medium text-ink/80">{q.label}</span>
            </Link>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Surat Menunggu Persetujuan"
          subtitle="Surat menyurat yang memerlukan tindak lanjut"
          action={
            <Link href="/surat" className="text-sm font-medium text-forest-700 hover:underline">
              Kelola surat
            </Link>
          }
        />
        <ul className="ledger-rule divide-y divide-forest-50">
          {letters.filter((l) => l.status === "pending").map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-3 px-5 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{l.subject}</p>
                <p className="text-xs text-ink/50">{l.number} &middot; {formatDate(l.date)}</p>
              </div>
              <Badge status={l.status} />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
