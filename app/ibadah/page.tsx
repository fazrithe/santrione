import { PageHeader, Card, CardHeader, TableShell, Th, Td } from "@/components/ui";
import { worshipToday } from "@/lib/dummy-data";
import { Check, X } from "lucide-react";

function Mark({ done }: { done: boolean }) {
  return done ? (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-50 text-forest-600">
      <Check size={13} />
    </span>
  ) : (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-500">
      <X size={13} />
    </span>
  );
}

export default function IbadahPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Monitoring Ibadah"
        title="Kedisiplinan Ibadah Harian"
        description="Pencatatan sholat wajib dan sunnah santri oleh musyrif/musyrifah asrama."
      />

      <Card>
        <CardHeader title="Rekap Ibadah — Sabtu, 5 Juli 2026" subtitle="Sampel 10 santri" />
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Nama Santri</Th>
              <Th>Kelas</Th>
              <Th>Subuh</Th>
              <Th>Dzuhur</Th>
              <Th>Ashar</Th>
              <Th>Maghrib</Th>
              <Th>Isya</Th>
              <Th>Dhuha</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {worshipToday.map((w) => (
              <tr key={w.studentName} className="hover:bg-forest-50/40">
                <Td className="font-medium text-ink">{w.studentName}</Td>
                <Td>{w.className}</Td>
                <Td><Mark done={w.subuh} /></Td>
                <Td><Mark done={w.dzuhur} /></Td>
                <Td><Mark done={w.ashar} /></Td>
                <Td><Mark done={w.maghrib} /></Td>
                <Td><Mark done={w.isya} /></Td>
                <Td><Mark done={w.dhuha} /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
