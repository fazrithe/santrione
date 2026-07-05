// =============================================================
// SantriOne — SIAKAD types
// Mirrors the `students`, `student_parents`, `student_documents`,
// `student_health_records`, `student_achievements`, and
// `student_violations` tables from the ERD.
// =============================================================

export type Gender = "L" | "P";

export type StudentStatus = "active" | "alumni" | "dropout" | "transferred" | "graduated";

export interface Student {
  id: string;
  nis: string;
  nisn: string;
  fullName: string;
  nickname?: string;
  gender: Gender;
  religion: string;
  placeOfBirth: string;
  dateOfBirth: string; // ISO date yyyy-mm-dd
  province: string;
  address: string;
  phone?: string;
  className: string;
  dormitory: string;
  entryYear: number;
  status: StudentStatus;
  photoInitials: string;
  createdAt: string;
  updatedAt: string;
}

export type ParentRelationship = "Ayah" | "Ibu" | "Wali";

export interface StudentParent {
  id: string;
  studentId: string;
  fullName: string;
  relationship: ParentRelationship;
  nik?: string;
  occupation?: string;
  phone?: string;
  email?: string;
  address?: string;
  isPrimaryContact: boolean;
}

export type DocumentType =
  | "akta_lahir"
  | "kartu_keluarga"
  | "ktp"
  | "ijazah"
  | "pas_foto"
  | "kartu_kesehatan"
  | "surat_pindah"
  | "other";

export interface StudentDocument {
  id: string;
  studentId: string;
  documentType: DocumentType;
  fileName: string;
  fileNumber?: string;
  issuedDate?: string;
}

export interface StudentHealthRecord {
  id: string;
  studentId: string;
  heightCm?: number;
  weightKg?: number;
  bloodType?: string;
  allergies?: string;
  chronicConditions?: string;
  emergencyContact?: string;
  recordedAt: string;
  notes?: string;
}

export type AchievementLevel =
  | "school"
  | "district"
  | "city"
  | "province"
  | "national"
  | "international";

export interface StudentAchievement {
  id: string;
  studentId: string;
  title: string;
  level: AchievementLevel;
  category?: string;
  achievedDate: string;
  description?: string;
}

export type ViolationSeverity = "light" | "medium" | "heavy";

export interface StudentViolation {
  id: string;
  studentId: string;
  severity: ViolationSeverity;
  title: string;
  description?: string;
  pointDeduction: number;
  violationDate: string;
  followUp?: string;
  reportedBy?: string;
}
