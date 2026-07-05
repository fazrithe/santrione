import { PageHeader, Card } from "@/components/ui";
import { notifications } from "@/lib/dummy-data";
import { Wallet, GraduationCap, Building2, Settings } from "lucide-react";

const categoryIcon: Record<string, typeof Wallet> = {
  keuangan: Wallet,
  akademik: GraduationCap,
  asrama: Building2,
  sistem: Settings,
};

const categoryLabel: Record<string, string> = {
  keuangan: "Keuangan",
  akademik: "Akademik",
  asrama: "Asrama",
  sistem: "Sistem",
};

export default function NotifikasiPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Notifikasi"
        title="Pusat Pemberitahuan"
        description="Notifikasi lintas modul: keuangan, akademik, asrama, dan sistem."
      />

      <Card>
        <ul className="divide-y divide-forest-50">
          {notifications.map((n) => {
            const Icon = categoryIcon[n.category];
            return (
              <li key={n.id} className={`flex gap-4 px-5 py-4 ${!n.read ? "bg-gold-50/40" : ""}`}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-600">
                  <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-semibold text-ink">{n.title}</p>
                    <span className="shrink-0 text-xs text-ink/40">{n.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink/60">{n.body}</p>
                  <span className="mt-2 inline-block rounded-full bg-forest-50 px-2 py-0.5 text-[11px] font-medium text-forest-700">
                    {categoryLabel[n.category]}
                  </span>
                </div>
                {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold-400" />}
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
