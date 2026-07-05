// =============================================================
// SantriOne — dummy data layer, shaped to mirror the PostgreSQL
// ERD (students, employees, classes, invoices, dormitories, ...)
// All data here is fictional and for demo purposes only.
// =============================================================

export type StudentStatus = "active" | "alumni" | "dropout" | "graduated";

export interface Student {
  id: string;
  nis: string;
  fullName: string;
  gender: "L" | "P";
  className: string;
  dormitory: string;
  entryYear: number;
  status: StudentStatus;
  photoInitials: string;
  province: string;
  guardian: string;
}

const maleNames = [
  "Ahmad Fauzan Ridho", "Muhammad Iqbal Habibie", "Rizky Ramadhan", "Faisal Abdul Aziz",
  "Ilham Nurhidayat", "Zaidan Al Ghifari", "Fathir Rasyid", "Naufal Hakim", "Dzaky Ramadhan",
  "Alif Maulana", "Rafi Ardiansyah", "Hafizh Al Fatih", "Yusuf Maulana", "Raihan Saputra",
  "Bilal Ats Tsauri",
];
const femaleNames = [
  "Aisyah Nur Fadhilah", "Salsabila Az Zahra", "Nadia Putri Ramadhani", "Khadijah Amelia",
  "Zahra Kamila", "Hanifah Rahmawati", "Aulia Rahma", "Nazwa Kirana", "Shakira Adzkia",
  "Fatimah Az Zahra", "Meisya Ananda", "Alya Ramadhani",
];

const classNames = ["7A", "7B", "8A", "8B", "9A", "10 IPA 1", "10 IPA 2", "11 IPA 1", "12 IPA 1"];
const dormitoryRoomNames = ["Ar-Rahman 1", "Ar-Rahman 2", "Al-Fatih 1", "Al-Fatih 2", "Khadijah 1", "Khadijah 2", "Aisyah 1"];
const provinces = ["Jawa Barat", "Jawa Tengah", "Jawa Timur", "DKI Jakarta", "Banten", "Sumatera Barat"];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

export const students: Student[] = Array.from({ length: 24 }).map((_, i) => {
  const isMale = i % 2 === 0;
  const namePool = isMale ? maleNames : femaleNames;
  const fullName = namePool[i % namePool.length];
  const status: StudentStatus = i % 13 === 0 ? "alumni" : i % 17 === 0 ? "dropout" : "active";
  return {
    id: `std-${i + 1}`,
    nis: `2026${String(1000 + i)}`,
    fullName,
    gender: isMale ? "L" : "P",
    className: classNames[i % classNames.length],
    dormitory: dormitoryRoomNames[i % dormitoryRoomNames.length],
    entryYear: 2022 + (i % 4),
    status,
    photoInitials: initials(fullName),
    province: provinces[i % provinces.length],
    guardian: `Bpk/Ibu ${namePool[(i + 3) % namePool.length].split(" ")[0]}`,
  };
});

// -------------------- SDM (Employees & Teachers) --------------------

export interface Employee {
  id: string;
  nip: string;
  fullName: string;
  position: string;
  role: string;
  status: "active" | "inactive" | "resigned";
  joinYear: number;
  subject?: string;
}

export const employees: Employee[] = [
  { id: "emp-1", nip: "19850112001", fullName: "Ust. Abdurrahman Wahid", position: "Kepala Sekolah", role: "Kepala Sekolah", status: "active", joinYear: 2014 },
  { id: "emp-2", nip: "19870304002", fullName: "Ustzh. Siti Maryam", position: "Waka Kurikulum", role: "Wakil Kepala Sekolah", status: "active", joinYear: 2016 },
  { id: "emp-3", nip: "19900521003", fullName: "Ust. Bahrul Ulum", position: "Guru Tahfidz", role: "Guru", status: "active", joinYear: 2018, subject: "Tahfidz Al-Qur'an" },
  { id: "emp-4", nip: "19920617004", fullName: "Ustzh. Halimatus Sa'diyah", position: "Wali Kelas 8A", role: "Wali Kelas", status: "active", joinYear: 2019, subject: "Matematika" },
  { id: "emp-5", nip: "19881109005", fullName: "Ust. Fauzan Hakim", position: "Pembina Asrama Putra", role: "Pembina Asrama", status: "active", joinYear: 2017 },
  { id: "emp-6", nip: "19940825006", fullName: "Ustzh. Nur Laila", position: "Musyrifah Al-Fatih", role: "Musyrifah", status: "active", joinYear: 2021 },
  { id: "emp-7", nip: "19830730007", fullName: "Bpk. Rudi Hartono", position: "Bendahara Pesantren", role: "Bendahara", status: "active", joinYear: 2015 },
  { id: "emp-8", nip: "19910412008", fullName: "Ibu Dewi Sartika", position: "Staf Tata Usaha", role: "Staf TU", status: "active", joinYear: 2020 },
  { id: "emp-9", nip: "19890203009", fullName: "Ust. Zainal Abidin", position: "Guru Fiqih", role: "Guru", status: "active", joinYear: 2017, subject: "Fiqih" },
  { id: "emp-10", nip: "19950615010", fullName: "Bpk. Slamet Riyadi", position: "Satpam", role: "Satpam", status: "active", joinYear: 2022 },
  { id: "emp-11", nip: "19860908011", fullName: "Ibu Ratna Sari", position: "Petugas Perpustakaan", role: "Petugas Perpustakaan", status: "active", joinYear: 2018 },
  { id: "emp-12", nip: "19930401012", fullName: "Bpk. Tono Setiawan", position: "Petugas Koperasi", role: "Petugas Koperasi", status: "active", joinYear: 2019 },
];

// -------------------- Akademik / Kelas --------------------

export interface ClassRoom {
  id: string;
  name: string;
  grade: string;
  homeroom: string;
  studentCount: number;
  capacity: number;
}

export const classRooms: ClassRoom[] = classNames.map((name, i) => ({
  id: `cls-${i + 1}`,
  name,
  grade: name.startsWith("7") ? "Kelas 7" : name.startsWith("8") ? "Kelas 8" : name.startsWith("9") ? "Kelas 9" : name.startsWith("10") ? "Kelas 10" : name.startsWith("11") ? "Kelas 11" : "Kelas 12",
  homeroom: employees[(i + 1) % employees.length].fullName,
  studentCount: students.filter((s) => s.className === name).length,
  capacity: 32,
}));

export interface AttendanceSummary {
  className: string;
  present: number;
  sick: number;
  permit: number;
  absent: number;
  total: number;
}

export const attendanceToday: AttendanceSummary[] = classRooms.map((c) => {
  const total = c.studentCount || 20;
  const absent = Math.floor(Math.random() * 2);
  const sick = Math.floor(Math.random() * 2);
  const permit = Math.floor(Math.random() * 2);
  return {
    className: c.name,
    present: Math.max(total - absent - sick - permit, 0),
    sick,
    permit,
    absent,
    total,
  };
});

export const weeklyAttendanceTrend = [
  { day: "Sen", hadir: 96, izin: 2, sakit: 1, alpha: 1 },
  { day: "Sel", hadir: 95, izin: 3, sakit: 1, alpha: 1 },
  { day: "Rab", hadir: 97, izin: 1, sakit: 1, alpha: 1 },
  { day: "Kam", hadir: 94, izin: 2, sakit: 3, alpha: 1 },
  { day: "Jum", hadir: 98, izin: 1, sakit: 1, alpha: 0 },
  { day: "Sab", hadir: 93, izin: 3, sakit: 2, alpha: 2 },
];

// -------------------- LMS --------------------

export interface Course {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  className: string;
  progress: number;
  assignmentsOpen: number;
}

export const courses: Course[] = [
  { id: "crs-1", title: "Tajwid Praktis: Hukum Nun Mati", subject: "Tahfidz & Tajwid", teacher: "Ust. Bahrul Ulum", className: "8A", progress: 72, assignmentsOpen: 2 },
  { id: "crs-2", title: "Aljabar Linear Dasar", subject: "Matematika", teacher: "Ustzh. Halimatus Sa'diyah", className: "8A", progress: 55, assignmentsOpen: 1 },
  { id: "crs-3", title: "Fiqih Muamalah Kontemporer", subject: "Fiqih", teacher: "Ust. Zainal Abidin", className: "10 IPA 1", progress: 40, assignmentsOpen: 3 },
  { id: "crs-4", title: "Sirah Nabawiyah: Periode Makkah", subject: "SKI", teacher: "Ustzh. Siti Maryam", className: "7A", progress: 88, assignmentsOpen: 0 },
  { id: "crs-5", title: "Bahasa Arab: Muhadatsah Yaumiyah", subject: "Bahasa Arab", teacher: "Ust. Bahrul Ulum", className: "9A", progress: 63, assignmentsOpen: 2 },
];

// -------------------- Rapor --------------------

export interface ReportSummary {
  studentName: string;
  className: string;
  average: number;
  attitude: string;
  rank: number;
}

export const reportSummaries: ReportSummary[] = students.slice(0, 10).map((s, i) => ({
  studentName: s.fullName,
  className: s.className,
  average: 78 + ((i * 7) % 20),
  attitude: ["A", "A", "B", "A", "B"][i % 5],
  rank: i + 1,
}));

// -------------------- Tahfidz --------------------

export interface MemorizationProgress {
  studentName: string;
  className: string;
  surahCurrent: string;
  juzCompleted: number;
  targetJuz: number;
  lastScore: number;
  status: "in_progress" | "completed" | "needs_repeat";
}

const surahList = ["An-Naba", "Al-Mulk", "Yasin", "Ar-Rahman", "Al-Waqiah", "Al-Kahfi"];

export const memorizationProgress: MemorizationProgress[] = students.slice(0, 12).map((s, i) => ({
  studentName: s.fullName,
  className: s.className,
  surahCurrent: surahList[i % surahList.length],
  juzCompleted: 1 + (i % 6),
  targetJuz: 6,
  lastScore: 75 + ((i * 5) % 20),
  status: (["in_progress", "completed", "needs_repeat"] as const)[i % 3],
}));

// -------------------- Ibadah --------------------

export interface WorshipLog {
  studentName: string;
  className: string;
  subuh: boolean;
  dzuhur: boolean;
  ashar: boolean;
  maghrib: boolean;
  isya: boolean;
  dhuha: boolean;
}

export const worshipToday: WorshipLog[] = students.slice(0, 10).map((s, i) => ({
  studentName: s.fullName,
  className: s.className,
  subuh: i % 5 !== 0,
  dzuhur: true,
  ashar: true,
  maghrib: true,
  isya: i % 4 !== 0,
  dhuha: i % 3 === 0,
}));

// -------------------- Asrama --------------------

export interface DormitoryRoom {
  id: string;
  dormitory: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
  supervisor: string;
  type: "male" | "female";
}

export const dormitoryRooms: DormitoryRoom[] = dormitoryRoomNames.map((name, i) => ({
  id: `room-${i + 1}`,
  dormitory: name.includes("Rahman") || name.includes("Fatih") ? "Asrama Putra Al-Fatih" : "Asrama Putri Khadijah",
  roomNumber: name,
  capacity: 8,
  occupied: 5 + (i % 4),
  supervisor: employees[(i + 4) % employees.length].fullName,
  type: name.includes("Rahman") || name.includes("Fatih") ? "male" : "female",
}));

// -------------------- Keuangan --------------------

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentName: string;
  className: string;
  category: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  status: "unpaid" | "partial" | "paid" | "overdue";
}

const paymentCategories = ["SPP Bulanan", "Uang Gedung", "Seragam & Buku", "Kegiatan Tahunan", "Konsumsi Asrama"];

export const invoices: Invoice[] = students.slice(0, 16).map((s, i) => {
  const amount = [750000, 4500000, 1200000, 900000, 600000][i % 5];
  const statusPool: Invoice["status"][] = ["paid", "unpaid", "partial", "overdue"];
  const status = statusPool[i % statusPool.length];
  const paidAmount = status === "paid" ? amount : status === "partial" ? Math.floor(amount * 0.5) : 0;
  return {
    id: `inv-${i + 1}`,
    invoiceNumber: `INV/2026/07/${String(1000 + i)}`,
    studentName: s.fullName,
    className: s.className,
    category: paymentCategories[i % paymentCategories.length],
    amount,
    paidAmount,
    dueDate: `2026-07-${10 + (i % 15)}`,
    status,
  };
});

export const monthlyRevenue = [
  { month: "Feb", spp: 210, kegiatan: 40 },
  { month: "Mar", spp: 215, kegiatan: 35 },
  { month: "Apr", spp: 208, kegiatan: 60 },
  { month: "Mei", spp: 220, kegiatan: 45 },
  { month: "Jun", spp: 224, kegiatan: 70 },
  { month: "Jul", spp: 231, kegiatan: 55 },
];

// -------------------- Perpustakaan --------------------

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  available: number;
}

export const libraryBooks: LibraryBook[] = [
  { id: "bk-1", title: "Ihya Ulumuddin", author: "Imam Al-Ghazali", category: "Tasawuf", totalCopies: 6, available: 2 },
  { id: "bk-2", title: "Fiqih Sunnah", author: "Sayyid Sabiq", category: "Fiqih", totalCopies: 10, available: 5 },
  { id: "bk-3", title: "Tafsir Ibnu Katsir (Ringkas)", author: "Ibnu Katsir", category: "Tafsir", totalCopies: 8, available: 3 },
  { id: "bk-4", title: "Riyadhus Shalihin", author: "Imam Nawawi", category: "Hadits", totalCopies: 12, available: 8 },
  { id: "bk-5", title: "Sirah Nabawiyah", author: "Syaikh Shafiyurrahman", category: "Sejarah", totalCopies: 7, available: 1 },
  { id: "bk-6", title: "Bulughul Maram", author: "Ibnu Hajar", category: "Hadits", totalCopies: 9, available: 4 },
];

export interface BorrowTransaction {
  id: string;
  bookTitle: string;
  borrower: string;
  borrowDate: string;
  dueDate: string;
  status: "borrowed" | "returned" | "overdue";
}

export const borrowTransactions: BorrowTransaction[] = students.slice(0, 8).map((s, i) => ({
  id: `brw-${i + 1}`,
  bookTitle: libraryBooks[i % libraryBooks.length].title,
  borrower: s.fullName,
  borrowDate: `2026-06-${10 + i}`,
  dueDate: `2026-07-${10 + i}`,
  status: (["borrowed", "returned", "overdue"] as const)[i % 3],
}));

// -------------------- Inventaris --------------------

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
  warehouse: string;
}

export const inventoryItems: InventoryItem[] = [
  { id: "itm-1", name: "Al-Qur'an Mushaf Standar", category: "Perlengkapan Ibadah", unit: "pcs", currentStock: 340, minStock: 100, warehouse: "Gudang Utama" },
  { id: "itm-2", name: "Sajadah Asrama", category: "Perlengkapan Ibadah", unit: "pcs", currentStock: 45, minStock: 50, warehouse: "Gudang Asrama Putra" },
  { id: "itm-3", name: "Seragam Batik Santri", category: "Seragam", unit: "stel", currentStock: 120, minStock: 60, warehouse: "Gudang Utama" },
  { id: "itm-4", name: "Kasur Busa Asrama", category: "Perlengkapan Kamar", unit: "pcs", currentStock: 18, minStock: 20, warehouse: "Gudang Asrama Putri" },
  { id: "itm-5", name: "Kitab Kuning (Fathul Qorib)", category: "Buku & Kitab", unit: "pcs", currentStock: 88, minStock: 30, warehouse: "Gudang Utama" },
  { id: "itm-6", name: "Alat Tulis Kantor", category: "ATK", unit: "paket", currentStock: 22, minStock: 25, warehouse: "Gudang TU" },
];

// -------------------- Koperasi --------------------

export interface CoopSale {
  id: string;
  salesNumber: string;
  buyer: string;
  items: string;
  total: number;
  date: string;
}

export const coopSales: CoopSale[] = [
  { id: "sl-1", salesNumber: "KOP/2026/07/0231", buyer: "Ahmad Fauzan Ridho", items: "Sabun mandi, pasta gigi", total: 25000, date: "2026-07-04" },
  { id: "sl-2", salesNumber: "KOP/2026/07/0232", buyer: "Salsabila Az Zahra", items: "Buku tulis, bolpoin", total: 18000, date: "2026-07-04" },
  { id: "sl-3", salesNumber: "KOP/2026/07/0233", buyer: "Rizky Ramadhan", items: "Snack, air mineral", total: 15000, date: "2026-07-05" },
  { id: "sl-4", salesNumber: "KOP/2026/07/0234", buyer: "Nadia Putri Ramadhani", items: "Sandal jepit", total: 22000, date: "2026-07-05" },
];

// -------------------- Surat Menyurat --------------------

export interface LetterItem {
  id: string;
  number: string;
  subject: string;
  type: string;
  direction: "incoming" | "outgoing";
  date: string;
  status: "pending" | "approved" | "rejected";
}

export const letters: LetterItem[] = [
  { id: "ltr-1", number: "001/PP/VII/2026", subject: "Surat Izin Pulang Santri - Libur Semester", type: "Surat Izin", direction: "outgoing", date: "2026-07-01", status: "approved" },
  { id: "ltr-2", number: "002/PP/VII/2026", subject: "Undangan Rapat Wali Santri", type: "Surat Undangan", direction: "outgoing", date: "2026-07-02", status: "approved" },
  { id: "ltr-3", number: "045/EXT/VII/2026", subject: "Permohonan Kerja Sama Kesehatan - Puskesmas", type: "Surat Masuk", direction: "incoming", date: "2026-07-03", status: "pending" },
  { id: "ltr-4", number: "003/PP/VII/2026", subject: "SK Penugasan Wali Kelas Tahun Ajaran Baru", type: "SK", direction: "outgoing", date: "2026-07-04", status: "pending" },
  { id: "ltr-5", number: "004/PP/VII/2026", subject: "Surat Keterangan Aktif Santri", type: "Surat Keterangan", direction: "outgoing", date: "2026-07-05", status: "approved" },
];

// -------------------- Notifikasi --------------------

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  category: "keuangan" | "akademik" | "asrama" | "sistem";
}

export const notifications: NotificationItem[] = [
  { id: "ntf-1", title: "Tagihan SPP Juli jatuh tempo 3 hari lagi", body: "16 santri belum menyelesaikan pembayaran SPP bulan Juli 2026.", time: "10 menit lalu", read: false, category: "keuangan" },
  { id: "ntf-2", title: "Rapor semester siap direview", body: "Rapor digital kelas 9A telah disusun wali kelas dan menunggu persetujuan.", time: "1 jam lalu", read: false, category: "akademik" },
  { id: "ntf-3", title: "Kamar Al-Fatih 2 melebihi kapasitas", body: "Jumlah penghuni saat ini 9 dari kapasitas 8 tempat tidur.", time: "3 jam lalu", read: true, category: "asrama" },
  { id: "ntf-4", title: "Pembaruan sistem terjadwal", body: "Pemeliharaan server akan dilakukan Sabtu pukul 23.00 - 01.00 WIB.", time: "Kemarin", read: true, category: "sistem" },
  { id: "ntf-5", title: "5 buku perpustakaan telah jatuh tempo", body: "Segera lakukan penagihan pengembalian buku ke santri terkait.", time: "Kemarin", read: true, category: "akademik" },
];

// -------------------- AI Assistant --------------------

export interface AiMessage {
  role: "user" | "assistant";
  content: string;
}

export const aiConversationSample: AiMessage[] = [
  { role: "user", content: "Berapa jumlah santri yang menunggak SPP bulan ini?" },
  { role: "assistant", content: "Ada 16 tagihan aktif bulan Juli 2026. Dari jumlah tersebut, 4 sudah lunas, 4 dibayar sebagian, 4 belum dibayar, dan 4 telah melewati jatuh tempo. Total tunggakan sekitar Rp 8.450.000. Ingin saya siapkan daftar wali santri untuk dihubungi?" },
  { role: "user", content: "Tolong ringkas capaian hafalan kelas 8A minggu ini." },
  { role: "assistant", content: "Kelas 8A rata-rata menyelesaikan 1,5 halaman baru per santri minggu ini. 3 santri mencapai target juz, 2 santri perlu mengulang karena skor tajwid di bawah 75. Musyrif tahfidz merekomendasikan sesi murajaah tambahan hari Kamis." },
];

// -------------------- Dashboard aggregate stats --------------------

export const dashboardStats = {
  totalStudents: 1240,
  totalEmployees: 186,
  attendanceRateToday: 96.4,
  revenueThisMonth: 231_000_000,
  outstandingInvoices: 42,
  activeDormitories: 12,
  booksAvailable: 3120,
  pendingLetters: letters.filter((l) => l.status === "pending").length,
};
