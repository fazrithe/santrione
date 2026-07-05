import { PageHeader, Card, TableShell, Th, Td, Badge } from "@/components/ui";
import { employees } from "@/lib/dummy-data";

export default function SdmPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Sumber Daya Manusia"
        title="Data Pegawai & Guru"
        description="Registri seluruh pegawai: guru, staf TU, bendahara, musyrif/musyrifah, hingga satpam."
      />

      <Card>
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>NIP</Th>
              <Th>Nama Lengkap</Th>
              <Th>Jabatan</Th>
              <Th>Peran</Th>
              <Th>Mapel Diampu</Th>
              <Th>Tahun Bergabung</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {employees.map((e) => (
              <tr key={e.id} className="hover:bg-forest-50/40">
                <Td className="font-mono text-xs">{e.nip}</Td>
                <Td className="font-medium text-ink">{e.fullName}</Td>
                <Td>{e.position}</Td>
                <Td>{e.role}</Td>
                <Td>{e.subject ?? "—"}</Td>
                <Td>{e.joinYear}</Td>
                <Td><Badge status={e.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
