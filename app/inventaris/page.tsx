import { PageHeader, Card, TableShell, Th, Td, Badge } from "@/components/ui";
import { inventoryItems } from "@/lib/dummy-data";

export default function InventarisPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inventaris"
        title="Stok Barang & Perlengkapan"
        description="Pemantauan stok gudang untuk perlengkapan ibadah, seragam, dan kebutuhan asrama."
      />

      <Card>
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Nama Barang</Th>
              <Th>Kategori</Th>
              <Th>Gudang</Th>
              <Th>Stok Saat Ini</Th>
              <Th>Stok Minimum</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {inventoryItems.map((item) => {
              const low = item.currentStock < item.minStock;
              return (
                <tr key={item.id} className="hover:bg-forest-50/40">
                  <Td className="font-medium text-ink">{item.name}</Td>
                  <Td>{item.category}</Td>
                  <Td>{item.warehouse}</Td>
                  <Td className="font-mono">{item.currentStock} {item.unit}</Td>
                  <Td className="font-mono">{item.minStock} {item.unit}</Td>
                  <Td><Badge status={low ? "overdue" : "active"} label={low ? "Perlu Restok" : "Aman"} /></Td>
                </tr>
              );
            })}
          </tbody>
        </TableShell>
      </Card>
    </div>
  );
}
