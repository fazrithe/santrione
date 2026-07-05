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

## Modul SIAKAD — fungsi penuh (CRUD + persistensi lokal)

Modul SIAKAD (`app/santri`) sudah berfungsi penuh sebagai "dummy backend" berbasis
state di browser (React Context + `localStorage`), bukan sekadar tabel statis:

- **Daftar santri** (`/santri`): pencarian (nama/NIS/NISN), filter kelas/status/jenis
  kelamin, paginasi, tambah santri baru, edit, hapus (dengan dialog konfirmasi), dan
  tombol "Reset Demo" untuk mengembalikan ke data contoh awal.
- **Detail santri** (`/santri/[id]`) dengan 6 tab, masing-masing punya CRUD sendiri:
  - **Profil** — data identitas lengkap.
  - **Wali Santri** — tambah/ubah/hapus data orang tua/wali (`student_parents`).
  - **Dokumen** — tambah/hapus dokumen administrasi (`student_documents`).
  - **Kesehatan** — tambah/ubah/hapus rekam kesehatan (`student_health_records`).
  - **Prestasi** — tambah/ubah/hapus prestasi (`student_achievements`).
  - **Pelanggaran** — tambah/ubah/hapus pelanggaran beserta total poin (`student_violations`).
- Semua perubahan tersimpan otomatis di `localStorage` browser Anda (key
  `santrione:siakad:v1`), sehingga bertahan walau halaman di-refresh — cocok untuk
  demo tanpa perlu database sungguhan. Notifikasi toast muncul setiap kali data
  berhasil ditambah/diubah/dihapus.
- File terkait: `lib/siakad/types.ts` (tipe data mengikuti ERD), `lib/siakad/seed.ts`
  (data awal), `lib/siakad/store.tsx` (context + fungsi CRUD), `components/siakad/*`
  (form untuk tiap entitas).
- Untuk versi produksi, ganti isi `lib/siakad/store.tsx` dengan pemanggilan API/ORM
  ke database PostgreSQL sesuai `erp_pesantren_terpadu.dbml` — bentuk fungsi CRUD-nya
  (addStudent, updateStudent, deleteStudent, dst.) sudah didesain agar tinggal diubah
  implementasinya dari `localStorage` menjadi `fetch()`/`prisma`/dsb tanpa mengubah UI.

## Modul Akademik — Kelas & Jadwal (fungsi penuh)

Modul Akademik (`app/akademik`) juga sudah berfungsi penuh dengan pola yang sama
(React Context + `localStorage` sebagai dummy backend), dengan 5 tab:

- **Kelas** — tambah/ubah/hapus rombongan belajar (nama, tingkatan, wali kelas,
  kapasitas, tahun ajaran). Setiap kelas punya tombol **"Anggota"** yang membuka
  pengelola anggota kelas — di sini Anda bisa memindahkan santri antar kelas
  langsung dari data SIAKAD (lintas modul: mengubah `className` pada data santri).
- **Tingkatan** — CRUD master tingkatan (`grades`), mis. Kelas 7 s.d. Kelas 12.
- **Mata Pelajaran** — CRUD daftar mapel (`subjects`) beserta kategori dan jam/minggu.
- **Penugasan Guru** — CRUD penugasan guru-mapel-kelas (`teacher_subjects`); ini jadi
  dasar untuk membuat jadwal.
- **Jadwal Pelajaran** — CRUD jadwal (`schedules`) yang dipilih dari penugasan guru
  yang sudah dibuat, lengkap hari, jam, dan ruang; bisa difilter per hari.

Data tersimpan di `localStorage` dengan key `santrione:akademik:v1`, terpisah dari
data SIAKAD tapi saling terhubung lewat fitur "Anggota Kelas". File terkait:
`lib/akademik/types.ts`, `lib/akademik/seed.ts`, `lib/akademik/store.tsx`,
`components/akademik/*`.

> Catatan arsitektur: provider `SiakadProvider` dan `ToastProvider` kini dipasang
> di `app/layout.tsx` (level root), bukan lagi di `app/santri/layout.tsx`, supaya
> modul lain (seperti Akademik) juga bisa membaca/mengubah data santri untuk
> fitur lintas modul semacam ini.

## Catatan

- Logo yang diunggah disalin ke `public/logo.png` dan `app/icon.png` (favicon) — silakan
  ganti dengan aset resmi pesantren Anda bila diperlukan.
- Modul "Asisten AI" adalah simulasi antarmuka chat (jawaban telah disiapkan sebelumnya);
  belum terhubung ke model AI atau data live.
- Untuk versi produksi, `lib/dummy-data.ts` perlu diganti dengan pemanggilan API/ORM yang
  membaca dari database PostgreSQL sesuai ERD (`erp_pesantren_terpadu.dbml`).
