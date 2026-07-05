// =============================================================
// SantriOne — Akademik (Kelas & Jadwal) types
// Mirrors the `grades`, `classes`, `subjects`, `teacher_subjects`,
// and `schedules` tables from the ERD. Student roster per class
// is derived from the SIAKAD store (`student.className`), so no
// separate junction type is needed here.
// =============================================================

export interface Grade {
  id: string;
  name: string;
  level: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  gradeId: string;
  homeroomTeacherId: string;
  capacity: number;
  academicYear: string;
  createdAt: string;
  updatedAt: string;
}

export type SubjectCategory = "umum" | "diniyah" | "muatan_lokal";

export interface Subject {
  id: string;
  code: string;
  name: string;
  category: SubjectCategory;
  creditHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherSubject {
  id: string;
  teacherId: string;
  subjectId: string;
  classId: string;
  createdAt: string;
}

export type DayOfWeek = "senin" | "selasa" | "rabu" | "kamis" | "jumat" | "sabtu";

export interface Schedule {
  id: string;
  teacherSubjectId: string;
  day: DayOfWeek;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  room: string;
  createdAt: string;
}
