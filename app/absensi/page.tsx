import { PageHeader, Card, CardHeader, TableShell, Th, Td } from "@/components/ui";
import { attendanceToday } from "@/lib/dummy-data";
import { AttendanceChart } from "@/components/charts/AttendanceChart";

export default function AbsensiPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Absensi"
        title="Rekap Kehadiran Harian"
        description="Absensi kelas per mata pelajaran, terintegrasi dengan jurnal mengajar guru."
      />

      <Card>
        <CardHeader title="Tren Kehadiran Mingguan" subtitle="Seluruh kelas, dalam persen" />
        <div className="px-2 pb-4 pt-2 sm:px-4">
          <AttendanceChart />
        </div>
      </Card>

      <Card>
        <CardHeader title="Rekap Per Kelas — Sabtu, 5 Juli 2026" />
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Kelas</Th>
              <Th>Hadir</Th>
              <Th>Sakit</Th>
              <Th>Izin</Th>
              <Th>Alpha</Th>
              <Th>Total Santri</Th>
              <Th>Persentase</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {attendanceToday.map((a) => (
              <tr key={a.className} className="hover:bg-forest-50/40">
                <Td className="font-medium text-ink">{a.className}</Td>
                <Td>{a.present}</Td>
                <Td>{a.sick}</Td>
                <Td>{a.permit}</Td>
                <Td>{a.total - a.present - a.sick - a.permit}</Td>
                <Td>{a.total}</Td>
                <Td className="font-mono text-xs font-medium text-forest-700">
                  {a.total ? Math.round((a.present / a.total) * 100) : 0}%
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
