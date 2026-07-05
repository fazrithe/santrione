# SantriOne — Demo ERP Pesantren Terpadu

Demo aplikasi web (Next.js 14, App Router, TypeScript, Tailwind CSS) yang merepresentasikan
ERD PostgreSQL ERP Pesantren Terpadu yang telah dirancang sebelumnya. Seluruh data pada
aplikasi ini adalah **data dummy** untuk keperluan demo tampilan (UI/UX), belum terhubung
ke database maupun API sungguhan.

## Cara menjalankan

Butuh Node.js 18.18+ (disarankan Node 20/22).

```bash
npm install
npm run dev
```

Buka http://localhost:3000 di browser.

Untuk build produksi:

```bash
npm run build
npm run start
```

## Struktur proyek

```
app/                     Halaman (App Router) — satu folder per modul
  page.tsx               Dasbor utama
  santri/                SIAKAD — data induk santri
  akademik/               Kelas & jadwal
  lms/                    Learning Management System
  absensi/                Absensi harian
  rapor/                  Rapor digital
  tahfidz/                Progres hafalan Al-Qur'an
  ibadah/                 Monitoring ibadah harian
  asrama/                 Okupansi kamar asrama
  keuangan/               Tagihan & pembayaran
  perpustakaan/           Koleksi & sirkulasi buku
  inventaris/             Stok barang & gudang
  koperasi/               Transaksi koperasi
  sdm/                    Data pegawai & guru
  surat/                  Surat menyurat & persetujuan
  notifikasi/             Pusat notifikasi
  ai-assistant/           Demo antarmuka asisten AI (chat, tanpa backend nyata)
components/              Sidebar, Topbar, AppShell, primitif UI (Card, Badge, Table, dll), chart
lib/dummy-data.ts        Seluruh data dummy, dibentuk mengikuti struktur ERD
lib/utils.ts             Helper format mata uang & tanggal
```

## Palet & tipografi

- Warna diturunkan dari logo yang diberikan: hijau tua (`forest`) sebagai warna utama,
  emas/kuning (`gold`) sebagai aksen, krem hangat (`cream`) sebagai latar.
- Font tampilan: **Fraunces** (serif berkarakter, dipakai terbatas pada judul).
- Font isi: **Plus Jakarta Sans**.
- Font angka/data: **IBM Plex Mono** — dipakai pada nominal, NIS/NIP, dan kode dokumen
  agar terasa seperti buku besar/registri pesantren.

## Catatan

- Logo yang diunggah disalin ke `public/logo.png` dan `app/icon.png` (favicon) — silakan
  ganti dengan aset resmi pesantren Anda bila diperlukan.
- Modul "Asisten AI" adalah simulasi antarmuka chat (jawaban telah disiapkan sebelumnya);
  belum terhubung ke model AI atau data live.
- Untuk versi produksi, `lib/dummy-data.ts` perlu diganti dengan pemanggilan API/ORM yang
  membaca dari database PostgreSQL sesuai ERD (`erp_pesantren_terpadu.dbml`).
