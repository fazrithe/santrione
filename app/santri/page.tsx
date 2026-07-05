import { UserPlus, Filter } from "lucide-react";
import { PageHeader, StatCard, TableShell, Th, Td, Badge } from "@/components/ui";
import { students, dashboardStats } from "@/lib/dummy-data";
import { Users, GraduationCap, Building2, UserX } from "lucide-react";

export default function SantriPage() {
  const active = students.filter((s) => s.status === "active").length;
  const alumni = students.filter((s) => s.status === "alumni").length;
  const dropout = students.filter((s) => s.status === "dropout").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="SIAKAD"
        title="Data Induk Santri"
        description="Registri utama seluruh santri: identitas, kelas, asrama, dan status keaktifan."
        action={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-forest-100 bg-white px-3.5 py-2 text-sm font-medium text-ink/70 shadow-soft hover:bg-forest-50">
              <Filter size={15} /> Filter
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white shadow-soft hover:bg-forest-800">
              <UserPlus size={15} /> Tambah Santri
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Santri Terdaftar" value={dashboardStats.totalStudents.toLocaleString("id-ID")} icon={Users} />
        <StatCard label="Santri Aktif (sampel)" value={String(active)} icon={GraduationCap} accent="gold" />
        <StatCard label="Alumni (sampel)" value={String(alumni)} icon={Building2} />
        <StatCard label="Keluar / Dropout (sampel)" value={String(dropout)} icon={UserX} trendUp={false} accent="gold" />
      </div>

      <TableShell>
        <thead className="bg-forest-50/60">
          <tr>
            <Th>NIS</Th>
            <Th>Nama Lengkap</Th>
            <Th>JK</Th>
            <Th>Kelas</Th>
            <Th>Asrama / Kamar</Th>
            <Th>Asal Provinsi</Th>
            <Th>Wali Santri</Th>
            <Th>Tahun Masuk</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-forest-50">
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-forest-50/40">
              <Td className="font-mono text-xs">{s.nis}</Td>
              <Td>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-100 text-xs font-semibold text-forest-700">
                    {s.photoInitials}
                  </span>
                  <span className="font-medium text-ink">{s.fullName}</span>
                </div>
              </Td>
              <Td>{s.gender}</Td>
              <Td>{s.className}</Td>
              <Td>{s.dormitory}</Td>
              <Td>{s.province}</Td>
              <Td>{s.guardian}</Td>
              <Td>{s.entryYear}</Td>
              <Td><Badge status={s.status} /></Td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  );
}
