import type { Grade, ClassRoom, Subject, TeacherSubject, Schedule } from "./types";
import { employees } from "@/lib/dummy-data";

const now = new Date().toISOString();

const teachingRoles = ["Guru", "Wali Kelas", "Kepala Sekolah", "Wakil Kepala Sekolah"];
export const teacherPool = employees.filter((e) => teachingRoles.includes(e.role));

export const seedGrades: Grade[] = [
  { id: "grd-7", name: "Kelas 7", level: 7, createdAt: now, updatedAt: now },
  { id: "grd-8", name: "Kelas 8", level: 8, createdAt: now, updatedAt: now },
  { id: "grd-9", name: "Kelas 9", level: 9, createdAt: now, updatedAt: now },
  { id: "grd-10", name: "Kelas 10", level: 10, createdAt: now, updatedAt: now },
  { id: "grd-11", name: "Kelas 11", level: 11, createdAt: now, updatedAt: now },
  { id: "grd-12", name: "Kelas 12", level: 12, createdAt: now, updatedAt: now },
];

function gradeIdForClassName(name: string) {
  if (name.startsWith("7")) return "grd-7";
  if (name.startsWith("8")) return "grd-8";
  if (name.startsWith("9")) return "grd-9";
  if (name.startsWith("10")) return "grd-10";
  if (name.startsWith("11")) return "grd-11";
  return "grd-12";
}

const classDefs = ["7A", "7B", "8A", "8B", "9A", "10 IPA 1", "10 IPA 2", "11 IPA 1", "12 IPA 1"];

export const seedClasses: ClassRoom[] = classDefs.map((name, i) => ({
  id: `cls-${i + 1}`,
  name,
  gradeId: gradeIdForClassName(name),
  homeroomTeacherId: teacherPool[(i + 1) % teacherPool.length]?.id ?? "",
  capacity: 32,
  academicYear: "2026/2027",
  createdAt: now,
  updatedAt: now,
}));

export const seedSubjects: Subject[] = [
  { id: "sub-1", code: "TAH-01", name: "Tahfidz & Tajwid", category: "diniyah", creditHours: 4, createdAt: now, updatedAt: now },
  { id: "sub-2", code: "MTK-01", name: "Matematika", category: "umum", creditHours: 4, createdAt: now, updatedAt: now },
  { id: "sub-3", code: "FQH-01", name: "Fiqih", category: "diniyah", creditHours: 2, createdAt: now, updatedAt: now },
  { id: "sub-4", code: "SKI-01", name: "Sejarah Kebudayaan Islam", category: "diniyah", creditHours: 2, createdAt: now, updatedAt: now },
  { id: "sub-5", code: "ARB-01", name: "Bahasa Arab", category: "diniyah", creditHours: 3, createdAt: now, updatedAt: now },
  { id: "sub-6", code: "ING-01", name: "Bahasa Inggris", category: "umum", creditHours: 3, createdAt: now, updatedAt: now },
  { id: "sub-7", code: "IPA-01", name: "Ilmu Pengetahuan Alam", category: "umum", creditHours: 3, createdAt: now, updatedAt: now },
  { id: "sub-8", code: "MLK-01", name: "Kaligrafi", category: "muatan_lokal", creditHours: 1, createdAt: now, updatedAt: now },
];

export const seedTeacherSubjects: TeacherSubject[] = seedClasses.flatMap((c, i) => {
  const subjectsForClass = [seedSubjects[i % seedSubjects.length], seedSubjects[(i + 2) % seedSubjects.length]];
  return subjectsForClass.map((subj, j) => ({
    id: `ts-${c.id}-${j}`,
    teacherId: teacherPool[(i + j) % teacherPool.length]?.id ?? "",
    subjectId: subj.id,
    classId: c.id,
    createdAt: now,
  }));
});

const days: Schedule["day"][] = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
const timeSlots = [
  ["07.00", "08.30"],
  ["08.30", "10.00"],
  ["10.15", "11.45"],
  ["13.00", "14.30"],
];
const rooms = ["Aula 1", "R. Kelas A", "R. Kelas B", "Lab Bahasa", "Mushola Utama"];

export const seedSchedules: Schedule[] = seedTeacherSubjects.map((ts, i) => ({
  id: `sch-${ts.id}`,
  teacherSubjectId: ts.id,
  day: days[i % days.length],
  startTime: timeSlots[i % timeSlots.length][0],
  endTime: timeSlots[i % timeSlots.length][1],
  room: rooms[i % rooms.length],
  createdAt: now,
}));
