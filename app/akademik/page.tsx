import { PageHeader, Card, CardHeader, TableShell, Th, Td, ProgressBar } from "@/components/ui";
import { classRooms } from "@/lib/dummy-data";

const scheduleToday = [
  { time: "07.00 - 08.30", subject: "Tahfidz & Tajwid", classRoom: "8A", teacher: "Ust. Bahrul Ulum", room: "Aula 1" },
  { time: "08.30 - 10.00", subject: "Matematika", classRoom: "8A", teacher: "Ustzh. Halimatus Sa'diyah", room: "R. 8A" },
  { time: "10.15 - 11.45", subject: "Fiqih", classRoom: "10 IPA 1", teacher: "Ust. Zainal Abidin", room: "R. 10-1" },
  { time: "13.00 - 14.30", subject: "Bahasa Arab", classRoom: "9A", teacher: "Ust. Bahrul Ulum", room: "R. 9A" },
  { time: "14.30 - 16.00", subject: "SKI", classRoom: "7A", teacher: "Ustzh. Siti Maryam", room: "R. 7A" },
];

export default function AkademikPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Akademik"
        title="Kelas & Jadwal Pelajaran"
        description="Kapasitas kelas, wali kelas, dan jadwal mengajar harian guru."
      />

      <Card>
        <CardHeader title="Daftar Rombongan Belajar" subtitle="Tahun Ajaran 2026/2027" />
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Kelas</Th>
              <Th>Tingkat</Th>
              <Th>Wali Kelas</Th>
              <Th>Jumlah Santri</Th>
              <Th>Kapasitas</Th>
              <Th>Okupansi</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {classRooms.map((c) => (
              <tr key={c.id} className="hover:bg-forest-50/40">
                <Td className="font-medium text-ink">{c.name}</Td>
                <Td>{c.grade}</Td>
                <Td>{c.homeroom}</Td>
                <Td>{c.studentCount || 22}</Td>
                <Td>{c.capacity}</Td>
                <Td className="w-40">
                  <ProgressBar value={((c.studentCount || 22) / c.capacity) * 100} />
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>

      <Card>
        <CardHeader title="Jadwal Mengajar Hari Ini" subtitle="Sabtu, 5 Juli 2026" />
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Waktu</Th>
              <Th>Mata Pelajaran</Th>
              <Th>Kelas</Th>
              <Th>Pengajar</Th>
              <Th>Ruang</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {scheduleToday.map((s, i) => (
              <tr key={i} className="hover:bg-forest-50/40">
                <Td className="font-mono text-xs">{s.time}</Td>
                <Td className="font-medium text-ink">{s.subject}</Td>
                <Td>{s.classRoom}</Td>
                <Td>{s.teacher}</Td>
                <Td>{s.room}</Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
