import { PageHeader, Card, CardHeader, StatCard, TableShell, Th, Td, Badge, ProgressBar } from "@/components/ui";
import { memorizationProgress } from "@/lib/dummy-data";
import { BookMarked, Target, Award } from "lucide-react";

export default function TahfidzPage() {
  const completed = memorizationProgress.filter((m) => m.status === "completed").length;
  const avgScore = Math.round(
    memorizationProgress.reduce((sum, m) => sum + m.lastScore, 0) / memorizationProgress.length
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tahfidz Al-Qur'an"
        title="Progres Hafalan Santri"
        description="Target setoran, capaian juz, dan penilaian tajwid per santri."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Santri Mencapai Target" value={`${completed} santri`} icon={Award} />
        <StatCard label="Rata-rata Skor Setoran" value={String(avgScore)} icon={Target} accent="gold" />
        <StatCard label="Total Target Aktif" value={`${memorizationProgress.length} santri`} icon={BookMarked} />
      </div>

      <Card>
        <CardHeader title="Rekap Setoran Hafalan" subtitle="Periode berjalan" />
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Nama Santri</Th>
              <Th>Kelas</Th>
              <Th>Surah Berjalan</Th>
              <Th>Progres Juz</Th>
              <Th>Skor Terakhir</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {memorizationProgress.map((m) => (
              <tr key={m.studentName} className="hover:bg-forest-50/40">
                <Td className="font-medium text-ink">{m.studentName}</Td>
                <Td>{m.className}</Td>
                <Td>{m.surahCurrent}</Td>
                <Td className="w-40">
                  <div className="flex items-center gap-2">
                    <div className="w-24"><ProgressBar value={(m.juzCompleted / m.targetJuz) * 100} accent="gold" /></div>
                    <span className="font-mono text-xs">{m.juzCompleted}/{m.targetJuz} juz</span>
                  </div>
                </Td>
                <Td className="font-mono">{m.lastScore}</Td>
                <Td><Badge status={m.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
