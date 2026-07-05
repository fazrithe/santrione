import { PageHeader, Card, TableShell, Th, Td, ProgressBar } from "@/components/ui";
import { dormitoryRooms } from "@/lib/dummy-data";
import { Building2 } from "lucide-react";

export default function AsramaPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Asrama"
        title="Okupansi Kamar Santri"
        description="Distribusi kamar per gedung asrama beserta pembina penanggung jawab."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dormitoryRooms.map((r) => {
          const pct = (r.occupied / r.capacity) * 100;
          const over = r.occupied > r.capacity;
          return (
            <Card key={r.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{r.dormitory}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink">Kamar {r.roomNumber}</h3>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-50 text-forest-600">
                  <Building2 size={17} />
                </span>
              </div>
              <p className="mt-2 text-sm text-ink/55">Pembina: {r.supervisor}</p>
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs text-ink/50">
                  <span>Okupansi</span>
                  <span className={`font-medium ${over ? "text-red-500" : "text-ink"}`}>
                    {r.occupied} / {r.capacity} santri
                  </span>
                </div>
                <ProgressBar value={pct} accent={over ? "gold" : "forest"} />
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Gedung</Th>
              <Th>Kamar</Th>
              <Th>Tipe</Th>
              <Th>Kapasitas</Th>
              <Th>Terisi</Th>
              <Th>Pembina / Musyrif</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {dormitoryRooms.map((r) => (
              <tr key={r.id} className="hover:bg-forest-50/40">
                <Td>{r.dormitory}</Td>
                <Td className="font-medium text-ink">{r.roomNumber}</Td>
                <Td className="capitalize">{r.type === "male" ? "Putra" : "Putri"}</Td>
                <Td>{r.capacity}</Td>
                <Td>{r.occupied}</Td>
                <Td>{r.supervisor}</Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
