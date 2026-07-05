import { PageHeader, Card, CardHeader, TableShell, Th, Td, Badge, ProgressBar } from "@/components/ui";
import { libraryBooks, borrowTransactions } from "@/lib/dummy-data";
import { formatDate } from "@/lib/utils";

export default function PerpustakaanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Perpustakaan"
        title="Koleksi & Sirkulasi Buku"
        description="Ketersediaan koleksi kitab dan transaksi peminjaman santri."
      />

      <Card>
        <CardHeader title="Koleksi Buku" subtitle="Ketersediaan per judul" />
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Judul</Th>
              <Th>Penulis</Th>
              <Th>Kategori</Th>
              <Th>Total Eksemplar</Th>
              <Th>Tersedia</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {libraryBooks.map((b) => (
              <tr key={b.id} className="hover:bg-forest-50/40">
                <Td className="font-medium text-ink">{b.title}</Td>
                <Td>{b.author}</Td>
                <Td>{b.category}</Td>
                <Td>{b.totalCopies}</Td>
                <Td className="w-40">
                  <div className="flex items-center gap-2">
                    <div className="w-20"><ProgressBar value={(b.available / b.totalCopies) * 100} /></div>
                    <span className="font-mono text-xs">{b.available}/{b.totalCopies}</span>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>

      <Card>
        <CardHeader title="Transaksi Peminjaman Terbaru" />
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Judul Buku</Th>
              <Th>Peminjam</Th>
              <Th>Tgl Pinjam</Th>
              <Th>Jatuh Tempo</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {borrowTransactions.map((t) => (
              <tr key={t.id} className="hover:bg-forest-50/40">
                <Td className="font-medium text-ink">{t.bookTitle}</Td>
                <Td>{t.borrower}</Td>
                <Td>{formatDate(t.borrowDate)}</Td>
                <Td>{formatDate(t.dueDate)}</Td>
                <Td><Badge status={t.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
