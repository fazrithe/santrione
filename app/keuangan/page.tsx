import { PageHeader, Card, CardHeader, StatCard, TableShell, Th, Td, Badge } from "@/components/ui";
import { invoices, dashboardStats } from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { Wallet, ReceiptText, AlertTriangle, TrendingUp } from "lucide-react";

export default function KeuanganPage() {
  const totalOutstanding = invoices
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + (i.amount - i.paidAmount), 0);
  const overdue = invoices.filter((i) => i.status === "overdue").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Keuangan"
        title="Tagihan & Pembayaran Santri"
        description="Kelola invoice SPP, uang gedung, dan kegiatan, terintegrasi dengan payment gateway."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pendapatan Bulan Ini" value={formatCurrency(dashboardStats.revenueThisMonth)} icon={Wallet} />
        <StatCard label="Total Invoice Aktif" value={`${invoices.length} invoice`} icon={ReceiptText} accent="gold" />
        <StatCard label="Total Tunggakan" value={formatCurrency(totalOutstanding)} icon={AlertTriangle} trendUp={false} />
        <StatCard label="Lewat Jatuh Tempo" value={`${overdue} invoice`} icon={TrendingUp} accent="gold" trendUp={false} />
      </div>

      <Card>
        <CardHeader title="Tren Pendapatan" subtitle="SPP vs Kegiatan, 6 bulan terakhir" />
        <div className="px-2 pb-4 pt-2 sm:px-4">
          <RevenueChart />
        </div>
      </Card>

      <Card>
        <CardHeader title="Daftar Tagihan Santri" subtitle="Periode Juli 2026" />
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>No. Invoice</Th>
              <Th>Santri</Th>
              <Th>Kategori</Th>
              <Th>Jumlah</Th>
              <Th>Dibayar</Th>
              <Th>Jatuh Tempo</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-forest-50/40">
                <Td className="font-mono text-xs">{inv.invoiceNumber}</Td>
                <Td className="font-medium text-ink">{inv.studentName}</Td>
                <Td>{inv.category}</Td>
                <Td className="font-mono">{formatCurrency(inv.amount)}</Td>
                <Td className="font-mono">{formatCurrency(inv.paidAmount)}</Td>
                <Td>{formatDate(inv.dueDate)}</Td>
                <Td><Badge status={inv.status} /></Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
