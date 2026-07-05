import { PageHeader, Card, CardHeader, StatCard, TableShell, Th, Td } from "@/components/ui";
import { coopSales } from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ShoppingBag, Receipt } from "lucide-react";

export default function KoperasiPage() {
  const totalToday = coopSales.reduce((sum, s) => sum + s.total, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Koperasi"
        title="Transaksi Penjualan Koperasi"
        description="Rekap penjualan harian koperasi pesantren kepada santri dan pegawai."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard label="Transaksi Hari Ini" value={`${coopSales.length} transaksi`} icon={Receipt} />
        <StatCard label="Total Penjualan Hari Ini" value={formatCurrency(totalToday)} icon={ShoppingBag} accent="gold" />
      </div>

      <Card>
        <CardHeader title="Riwayat Transaksi" />
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>No. Transaksi</Th>
              <Th>Pembeli</Th>
              <Th>Item</Th>
              <Th>Total</Th>
              <Th>Tanggal</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {coopSales.map((s) => (
              <tr key={s.id} className="hover:bg-forest-50/40">
                <Td className="font-mono text-xs">{s.salesNumber}</Td>
                <Td className="font-medium text-ink">{s.buyer}</Td>
                <Td>{s.items}</Td>
                <Td className="font-mono">{formatCurrency(s.total)}</Td>
                <Td>{formatDate(s.date)}</Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
