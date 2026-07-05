import type {
  Student,
  StudentParent,
  StudentDocument,
  StudentHealthRecord,
  StudentAchievement,
  StudentViolation,
} from "./types";

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

export const classNames = ["7A", "7B", "8A", "8B", "9A", "10 IPA 1", "10 IPA 2", "11 IPA 1", "12 IPA 1"];
export const dormitoryRoomNames = ["Ar-Rahman 1", "Ar-Rahman 2", "Al-Fatih 1", "Al-Fatih 2", "Khadijah 1", "Khadijah 2", "Aisyah 1"];
export const provinces = ["Jawa Barat", "Jawa Tengah", "Jawa Timur", "DKI Jakarta", "Banten", "Sumatera Barat"];
const religions = ["Islam"];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function pad(n: number, len = 2) {
  return String(n).padStart(len, "0");
}

function dobFromEntryYear(entryYear: number, idx: number) {
  const age = 12 + (idx % 6); // rough age spread
  const year = entryYear - age;
  const month = 1 + (idx % 12);
  const day = 1 + (idx % 27);
  return `${year}-${pad(month)}-${pad(day)}`;
}

const now = new Date().toISOString();

export const seedStudents: Student[] = Array.from({ length: 24 }).map((_, i) => {
  const isMale = i % 2 === 0;
  const namePool = isMale ? maleNames : femaleNames;
  const fullName = namePool[i % namePool.length];
  const status: Student["status"] =
    i % 13 === 0 ? "alumni" : i % 17 === 0 ? "dropout" : i % 19 === 0 ? "transferred" : "active";
  const entryYear = 2022 + (i % 4);
  return {
    id: `std-${i + 1}`,
    nis: `2026${String(1000 + i)}`,
    nisn: `00${String(98765 + i * 3)}`,
    fullName,
    nickname: fullName.split(" ")[0],
    gender: isMale ? "L" : "P",
    religion: religions[0],
    placeOfBirth: provinces[i % provinces.length].split(" ")[0],
    dateOfBirth: dobFromEntryYear(entryYear, i),
    province: provinces[i % provinces.length],
    address: `Jl. Pesantren No. ${i + 1}, RT 0${(i % 9) + 1}/RW 0${(i % 5) + 1}`,
    phone: i % 4 === 0 ? `08${1000000000 + i * 7654321}`.slice(0, 12) : undefined,
    className: classNames[i % classNames.length],
    dormitory: dormitoryRoomNames[i % dormitoryRoomNames.length],
    entryYear,
    status,
    photoInitials: initials(fullName),
    createdAt: now,
    updatedAt: now,
  };
});

export const seedParents: StudentParent[] = seedStudents.flatMap((s, i) => {
  const fatherPool = maleNames;
  const motherPool = femaleNames;
  const father: StudentParent = {
    id: `prt-${s.id}-ayah`,
    studentId: s.id,
    fullName: `${fatherPool[(i + 2) % fatherPool.length].split(" ")[0]} bin ${fatherPool[(i + 5) % fatherPool.length].split(" ")[0]}`,
    relationship: "Ayah",
    nik: `32${String(1000000000000 + i)}`.slice(0, 16),
    occupation: ["Wiraswasta", "PNS", "Petani", "Pedagang", "Guru"][i % 5],
    phone: `08${2000000000 + i * 1234567}`.slice(0, 12),
    address: s.address,
    isPrimaryContact: true,
  };
  const mother: StudentParent = {
    id: `prt-${s.id}-ibu`,
    studentId: s.id,
    fullName: `${motherPool[(i + 1) % motherPool.length].split(" ")[0]} binti ${fatherPool[(i + 4) % fatherPool.length].split(" ")[0]}`,
    relationship: "Ibu",
    nik: `32${String(2000000000000 + i)}`.slice(0, 16),
    occupation: ["Ibu Rumah Tangga", "Wiraswasta", "Guru", "PNS"][i % 4],
    phone: `08${3000000000 + i * 7654321}`.slice(0, 12),
    address: s.address,
    isPrimaryContact: false,
  };
  return [father, mother];
});

export const seedDocuments: StudentDocument[] = seedStudents.flatMap((s, i) => {
  const docs: StudentDocument[] = [
    {
      id: `doc-${s.id}-akta`,
      studentId: s.id,
      documentType: "akta_lahir",
      fileName: `akta_lahir_${s.nis}.pdf`,
      fileNumber: `AL-${1000 + i}`,
      issuedDate: `${s.entryYear - 12}-03-15`,
    },
    {
      id: `doc-${s.id}-kk`,
      studentId: s.id,
      documentType: "kartu_keluarga",
      fileName: `kk_${s.nis}.pdf`,
      fileNumber: `KK-${2000 + i}`,
      issuedDate: `${s.entryYear - 5}-01-10`,
    },
  ];
  if (i % 3 === 0) {
    docs.push({
      id: `doc-${s.id}-ijazah`,
      studentId: s.id,
      documentType: "ijazah",
      fileName: `ijazah_sd_${s.nis}.pdf`,
      fileNumber: `IJZ-${3000 + i}`,
      issuedDate: `${s.entryYear}-06-20`,
    });
  }
  return docs;
});

export const seedHealthRecords: StudentHealthRecord[] = seedStudents.map((s, i) => ({
  id: `hlt-${s.id}`,
  studentId: s.id,
  heightCm: 145 + (i % 25),
  weightKg: 38 + (i % 20),
  bloodType: ["A", "B", "AB", "O"][i % 4],
  allergies: i % 5 === 0 ? "Alergi debu" : undefined,
  chronicConditions: i % 9 === 0 ? "Asma ringan" : undefined,
  emergencyContact: `08${4000000000 + i * 1122334}`.slice(0, 12),
  recordedAt: `2026-0${(i % 6) + 1}-10`,
  notes: i % 7 === 0 ? "Perlu pemeriksaan mata lanjutan" : undefined,
}));

const achievementTitles = [
  "Juara 1 Musabaqah Tilawatil Qur'an", "Juara 2 Olimpiade Matematika", "Juara 1 Lomba Pidato Bahasa Arab",
  "Juara 3 Lomba Kaligrafi", "Juara 1 Kompetisi Sains Madrasah", "Juara Harapan 1 Debat Bahasa Inggris",
];

export const seedAchievements: StudentAchievement[] = seedStudents
  .filter((_, i) => i % 3 === 0)
  .map((s, i) => ({
    id: `ach-${s.id}`,
    studentId: s.id,
    title: achievementTitles[i % achievementTitles.length],
    level: (["school", "district", "city", "province", "national"] as const)[i % 5],
    category: "Akademik & Non-Akademik",
    achievedDate: `2026-0${(i % 6) + 1}-2${i % 8}`,
    description: "Diraih dalam ajang kompetisi antar pesantren tingkat wilayah.",
  }));

const violationTitles = [
  "Terlambat mengikuti sholat berjamaah", "Tidak mengerjakan tugas hafalan", "Membawa alat elektronik terlarang",
  "Melanggar jam malam asrama", "Tidak mengikuti kegiatan ekstrakurikuler",
];

export const seedViolations: StudentViolation[] = seedStudents
  .filter((_, i) => i % 5 === 0)
  .map((s, i) => ({
    id: `vio-${s.id}`,
    studentId: s.id,
    severity: (["light", "medium", "heavy"] as const)[i % 3],
    title: violationTitles[i % violationTitles.length],
    description: "Dicatat oleh musyrif/musyrifah asrama pada saat kontrol malam.",
    pointDeduction: [5, 10, 25][i % 3],
    violationDate: `2026-06-1${i % 9}`,
    followUp: i % 2 === 0 ? "Sudah dipanggil dan diberi pembinaan" : undefined,
    reportedBy: "Ust. Fauzan Hakim",
  }));
