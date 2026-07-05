import { PageHeader, Card, TableShell, Th, Td, Badge } from "@/components/ui";
import { letters } from "@/lib/dummy-data";
import { formatDate } from "@/lib/utils";

export default function SuratPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Surat Menyurat"
        title="Arsip & Persetujuan Surat"
        description="Surat masuk, surat keluar, dan alur persetujuan digital dengan tanda tangan elektronik."
      />

      <Card>
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Nomor Surat</Th>
              <Th>Perihal</Th>
              <Th>Jenis</Th>
              <Th>Arah</Th>
              <Th>Tanggal</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {letters.map((l) => (
              <tr key={l.id} className="hover:bg-forest-50/40">
                <Td className="font-mono text-xs">{l.number}</Td>
                <Td className="font-medium text-ink">{l.subject}</Td>
                <Td>{l.type}</Td>
                <Td className="capitalize">{l.direction === "incoming" ? "Masuk" : "Keluar"}</Td>
                <Td>{formatDate(l.date)}</Td>
                <Td><Badge status={l.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
