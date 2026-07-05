import { PageHeader, Card, TableShell, Th, Td, Badge } from "@/components/ui";
import { reportSummaries } from "@/lib/dummy-data";

export default function RaporPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Rapor Digital"
        title="Ringkasan Hasil Belajar Semester"
        description="Nilai rata-rata, predikat sikap, dan peringkat santri per semester berjalan."
      />

      <Card>
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Peringkat</Th>
              <Th>Nama Santri</Th>
              <Th>Kelas</Th>
              <Th>Rata-rata Nilai</Th>
              <Th>Predikat Sikap</Th>
              <Th>Status Rapor</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {reportSummaries.map((r) => (
              <tr key={r.studentName} className="hover:bg-forest-50/40">
                <Td className="font-mono text-xs font-semibold text-gold-600">#{r.rank}</Td>
                <Td className="font-medium text-ink">{r.studentName}</Td>
                <Td>{r.className}</Td>
                <Td className="font-mono">{r.average}</Td>
                <Td>{r.attitude}</Td>
                <Td><Badge status={r.rank <= 5 ? "published" : "draft"} label={r.rank <= 5 ? "Terbit" : "Draf"} /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
