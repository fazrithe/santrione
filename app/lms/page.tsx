import { PageHeader, Card, CardHeader, ProgressBar } from "@/components/ui";
import { courses } from "@/lib/dummy-data";
import { FileText, Clock } from "lucide-react";

export default function LmsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Learning Management System"
        title="Materi & Penugasan Kelas"
        description="Kelola materi ajar, tugas, dan kuis digital untuk tiap mata pelajaran."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.id} className="flex flex-col p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{c.subject}</p>
            <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink">{c.title}</h3>
            <p className="mt-1 text-sm text-ink/55">{c.teacher} &middot; Kelas {c.className}</p>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs text-ink/50">
                <span>Progres santri</span>
                <span className="font-medium text-ink">{c.progress}%</span>
              </div>
              <ProgressBar value={c.progress} accent={c.progress > 70 ? "forest" : "gold"} />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-forest-50 pt-3 text-xs text-ink/55">
              <span className="flex items-center gap-1.5">
                <FileText size={14} /> {c.assignmentsOpen} tugas terbuka
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> Aktif
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="Tenggat Tugas Mendatang" subtitle="Ringkasan lintas kelas" />
        <ul className="divide-y divide-forest-50">
          {courses.filter((c) => c.assignmentsOpen > 0).map((c) => (
            <li key={c.id} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <p className="text-sm font-medium text-ink">{c.title}</p>
                <p className="text-xs text-ink/50">Kelas {c.className} &middot; {c.subject}</p>
              </div>
              <span className="rounded-full bg-gold-50 px-2.5 py-1 text-xs font-medium text-gold-700">
                {c.assignmentsOpen} tugas
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
