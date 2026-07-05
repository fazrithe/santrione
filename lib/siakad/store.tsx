"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  seedStudents,
  seedParents,
  seedDocuments,
  seedHealthRecords,
  seedAchievements,
  seedViolations,
} from "./seed";
import type {
  Student,
  StudentParent,
  StudentDocument,
  StudentHealthRecord,
  StudentAchievement,
  StudentViolation,
} from "./types";

const STORAGE_KEY = "santrione:siakad:v1";

interface SiakadData {
  students: Student[];
  parents: StudentParent[];
  documents: StudentDocument[];
  healthRecords: StudentHealthRecord[];
  achievements: StudentAchievement[];
  violations: StudentViolation[];
}

function genId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function loadInitial(): SiakadData {
  return {
    students: seedStudents,
    parents: seedParents,
    documents: seedDocuments,
    healthRecords: seedHealthRecords,
    achievements: seedAchievements,
    violations: seedViolations,
  };
}

interface SiakadContextValue {
  // Data
  students: Student[];
  parents: StudentParent[];
  documents: StudentDocument[];
  healthRecords: StudentHealthRecord[];
  achievements: StudentAchievement[];
  violations: StudentViolation[];
  hydrated: boolean;

  // Student CRUD
  getStudent: (id: string) => Student | undefined;
  addStudent: (input: Omit<Student, "id" | "photoInitials" | "createdAt" | "updatedAt">) => Student;
  updateStudent: (id: string, input: Omit<Student, "id" | "photoInitials" | "createdAt" | "updatedAt">) => void;
  deleteStudent: (id: string) => void;

  // Parents CRUD
  getParentsByStudent: (studentId: string) => StudentParent[];
  addParent: (input: Omit<StudentParent, "id">) => void;
  updateParent: (id: string, input: Omit<StudentParent, "id" | "studentId">) => void;
  deleteParent: (id: string) => void;

  // Documents CRUD
  getDocumentsByStudent: (studentId: string) => StudentDocument[];
  addDocument: (input: Omit<StudentDocument, "id">) => void;
  deleteDocument: (id: string) => void;

  // Health records CRUD
  getHealthRecordsByStudent: (studentId: string) => StudentHealthRecord[];
  addHealthRecord: (input: Omit<StudentHealthRecord, "id">) => void;
  updateHealthRecord: (id: string, input: Omit<StudentHealthRecord, "id" | "studentId">) => void;
  deleteHealthRecord: (id: string) => void;

  // Achievements CRUD
  getAchievementsByStudent: (studentId: string) => StudentAchievement[];
  addAchievement: (input: Omit<StudentAchievement, "id">) => void;
  updateAchievement: (id: string, input: Omit<StudentAchievement, "id" | "studentId">) => void;
  deleteAchievement: (id: string) => void;

  // Violations CRUD
  getViolationsByStudent: (studentId: string) => StudentViolation[];
  addViolation: (input: Omit<StudentViolation, "id">) => void;
  updateViolation: (id: string, input: Omit<StudentViolation, "id" | "studentId">) => void;
  deleteViolation: (id: string) => void;

  resetDemoData: () => void;
}

const SiakadContext = createContext<SiakadContextValue | null>(null);

export function SiakadProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiakadData>(() => loadInitial());
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount (client-only), so SSR output stays
  // deterministic and matches the first client render.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SiakadData;
        setData(parsed);
      }
    } catch {
      // ignore corrupt storage, fall back to seed data
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage full or unavailable — demo continues in-memory only
    }
  }, [data, hydrated]);

  const getStudent = useCallback((id: string) => data.students.find((s) => s.id === id), [data.students]);

  const addStudent: SiakadContextValue["addStudent"] = useCallback((input) => {
    const nowIso = new Date().toISOString();
    const newStudent: Student = {
      ...input,
      id: genId("std"),
      photoInitials: initials(input.fullName),
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    setData((prev) => ({ ...prev, students: [newStudent, ...prev.students] }));
    return newStudent;
  }, []);

  const updateStudent: SiakadContextValue["updateStudent"] = useCallback((id, input) => {
    setData((prev) => ({
      ...prev,
      students: prev.students.map((s) =>
        s.id === id
          ? { ...s, ...input, photoInitials: initials(input.fullName), updatedAt: new Date().toISOString() }
          : s
      ),
    }));
  }, []);

  const deleteStudent: SiakadContextValue["deleteStudent"] = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== id),
      parents: prev.parents.filter((p) => p.studentId !== id),
      documents: prev.documents.filter((d) => d.studentId !== id),
      healthRecords: prev.healthRecords.filter((h) => h.studentId !== id),
      achievements: prev.achievements.filter((a) => a.studentId !== id),
      violations: prev.violations.filter((v) => v.studentId !== id),
    }));
  }, []);

  // ---- Parents ----
  const getParentsByStudent = useCallback(
    (studentId: string) => data.parents.filter((p) => p.studentId === studentId),
    [data.parents]
  );
  const addParent: SiakadContextValue["addParent"] = useCallback((input) => {
    setData((prev) => ({ ...prev, parents: [{ ...input, id: genId("prt") }, ...prev.parents] }));
  }, []);
  const updateParent: SiakadContextValue["updateParent"] = useCallback((id, input) => {
    setData((prev) => ({
      ...prev,
      parents: prev.parents.map((p) => (p.id === id ? { ...p, ...input } : p)),
    }));
  }, []);
  const deleteParent: SiakadContextValue["deleteParent"] = useCallback((id) => {
    setData((prev) => ({ ...prev, parents: prev.parents.filter((p) => p.id !== id) }));
  }, []);

  // ---- Documents ----
  const getDocumentsByStudent = useCallback(
    (studentId: string) => data.documents.filter((d) => d.studentId === studentId),
    [data.documents]
  );
  const addDocument: SiakadContextValue["addDocument"] = useCallback((input) => {
    setData((prev) => ({ ...prev, documents: [{ ...input, id: genId("doc") }, ...prev.documents] }));
  }, []);
  const deleteDocument: SiakadContextValue["deleteDocument"] = useCallback((id) => {
    setData((prev) => ({ ...prev, documents: prev.documents.filter((d) => d.id !== id) }));
  }, []);

  // ---- Health records ----
  const getHealthRecordsByStudent = useCallback(
    (studentId: string) => data.healthRecords.filter((h) => h.studentId === studentId),
    [data.healthRecords]
  );
  const addHealthRecord: SiakadContextValue["addHealthRecord"] = useCallback((input) => {
    setData((prev) => ({ ...prev, healthRecords: [{ ...input, id: genId("hlt") }, ...prev.healthRecords] }));
  }, []);
  const updateHealthRecord: SiakadContextValue["updateHealthRecord"] = useCallback((id, input) => {
    setData((prev) => ({
      ...prev,
      healthRecords: prev.healthRecords.map((h) => (h.id === id ? { ...h, ...input } : h)),
    }));
  }, []);
  const deleteHealthRecord: SiakadContextValue["deleteHealthRecord"] = useCallback((id) => {
    setData((prev) => ({ ...prev, healthRecords: prev.healthRecords.filter((h) => h.id !== id) }));
  }, []);

  // ---- Achievements ----
  const getAchievementsByStudent = useCallback(
    (studentId: string) => data.achievements.filter((a) => a.studentId === studentId),
    [data.achievements]
  );
  const addAchievement: SiakadContextValue["addAchievement"] = useCallback((input) => {
    setData((prev) => ({ ...prev, achievements: [{ ...input, id: genId("ach") }, ...prev.achievements] }));
  }, []);
  const updateAchievement: SiakadContextValue["updateAchievement"] = useCallback((id, input) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) => (a.id === id ? { ...a, ...input } : a)),
    }));
  }, []);
  const deleteAchievement: SiakadContextValue["deleteAchievement"] = useCallback((id) => {
    setData((prev) => ({ ...prev, achievements: prev.achievements.filter((a) => a.id !== id) }));
  }, []);

  // ---- Violations ----
  const getViolationsByStudent = useCallback(
    (studentId: string) => data.violations.filter((v) => v.studentId === studentId),
    [data.violations]
  );
  const addViolation: SiakadContextValue["addViolation"] = useCallback((input) => {
    setData((prev) => ({ ...prev, violations: [{ ...input, id: genId("vio") }, ...prev.violations] }));
  }, []);
  const updateViolation: SiakadContextValue["updateViolation"] = useCallback((id, input) => {
    setData((prev) => ({
      ...prev,
      violations: prev.violations.map((v) => (v.id === id ? { ...v, ...input } : v)),
    }));
  }, []);
  const deleteViolation: SiakadContextValue["deleteViolation"] = useCallback((id) => {
    setData((prev) => ({ ...prev, violations: prev.violations.filter((v) => v.id !== id) }));
  }, []);

  const resetDemoData = useCallback(() => {
    setData(loadInitial());
  }, []);

  const value = useMemo<SiakadContextValue>(
    () => ({
      ...data,
      hydrated,
      getStudent,
      addStudent,
      updateStudent,
      deleteStudent,
      getParentsByStudent,
      addParent,
      updateParent,
      deleteParent,
      getDocumentsByStudent,
      addDocument,
      deleteDocument,
      getHealthRecordsByStudent,
      addHealthRecord,
      updateHealthRecord,
      deleteHealthRecord,
      getAchievementsByStudent,
      addAchievement,
      updateAchievement,
      deleteAchievement,
      getViolationsByStudent,
      addViolation,
      updateViolation,
      deleteViolation,
      resetDemoData,
    }),
    [
      data,
      hydrated,
      getStudent,
      addStudent,
      updateStudent,
      deleteStudent,
      getParentsByStudent,
      addParent,
      updateParent,
      deleteParent,
      getDocumentsByStudent,
      addDocument,
      deleteDocument,
      getHealthRecordsByStudent,
      addHealthRecord,
      updateHealthRecord,
      deleteHealthRecord,
      getAchievementsByStudent,
      addAchievement,
      updateAchievement,
      deleteAchievement,
      getViolationsByStudent,
      addViolation,
      updateViolation,
      deleteViolation,
      resetDemoData,
    ]
  );

  return <SiakadContext.Provider value={value}>{children}</SiakadContext.Provider>;
}

export function useSiakad() {
  const ctx = useContext(SiakadContext);
  if (!ctx) throw new Error("useSiakad must be used within SiakadProvider");
  return ctx;
}
