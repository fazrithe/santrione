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
import { seedGrades, seedClasses, seedSubjects, seedTeacherSubjects, seedSchedules } from "./seed";
import type { Grade, ClassRoom, Subject, TeacherSubject, Schedule } from "./types";

const STORAGE_KEY = "santrione:akademik:v1";

interface AkademikData {
  grades: Grade[];
  classes: ClassRoom[];
  subjects: Subject[];
  teacherSubjects: TeacherSubject[];
  schedules: Schedule[];
}

function genId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function loadInitial(): AkademikData {
  return {
    grades: seedGrades,
    classes: seedClasses,
    subjects: seedSubjects,
    teacherSubjects: seedTeacherSubjects,
    schedules: seedSchedules,
  };
}

interface AkademikContextValue extends AkademikData {
  hydrated: boolean;

  addGrade: (input: Omit<Grade, "id" | "createdAt" | "updatedAt">) => void;
  updateGrade: (id: string, input: Omit<Grade, "id" | "createdAt" | "updatedAt">) => void;
  deleteGrade: (id: string) => void;

  addClass: (input: Omit<ClassRoom, "id" | "createdAt" | "updatedAt">) => void;
  updateClass: (id: string, input: Omit<ClassRoom, "id" | "createdAt" | "updatedAt">) => void;
  deleteClass: (id: string) => void;

  addSubject: (input: Omit<Subject, "id" | "createdAt" | "updatedAt">) => void;
  updateSubject: (id: string, input: Omit<Subject, "id" | "createdAt" | "updatedAt">) => void;
  deleteSubject: (id: string) => void;

  addTeacherSubject: (input: Omit<TeacherSubject, "id" | "createdAt">) => void;
  deleteTeacherSubject: (id: string) => void;

  addSchedule: (input: Omit<Schedule, "id" | "createdAt">) => void;
  updateSchedule: (id: string, input: Omit<Schedule, "id" | "createdAt">) => void;
  deleteSchedule: (id: string) => void;

  resetDemoData: () => void;
}

const AkademikContext = createContext<AkademikContextValue | null>(null);

export function AkademikProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AkademikData>(() => loadInitial());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw) as AkademikData);
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
      // storage unavailable — demo continues in-memory only
    }
  }, [data, hydrated]);

  // ---- Grades ----
  const addGrade: AkademikContextValue["addGrade"] = useCallback((input) => {
    const nowIso = new Date().toISOString();
    setData((prev) => ({
      ...prev,
      grades: [{ ...input, id: genId("grd"), createdAt: nowIso, updatedAt: nowIso }, ...prev.grades],
    }));
  }, []);
  const updateGrade: AkademikContextValue["updateGrade"] = useCallback((id, input) => {
    setData((prev) => ({
      ...prev,
      grades: prev.grades.map((g) => (g.id === id ? { ...g, ...input, updatedAt: new Date().toISOString() } : g)),
    }));
  }, []);
  const deleteGrade: AkademikContextValue["deleteGrade"] = useCallback((id) => {
    setData((prev) => ({ ...prev, grades: prev.grades.filter((g) => g.id !== id) }));
  }, []);

  // ---- Classes ----
  const addClass: AkademikContextValue["addClass"] = useCallback((input) => {
    const nowIso = new Date().toISOString();
    setData((prev) => ({
      ...prev,
      classes: [{ ...input, id: genId("cls"), createdAt: nowIso, updatedAt: nowIso }, ...prev.classes],
    }));
  }, []);
  const updateClass: AkademikContextValue["updateClass"] = useCallback((id, input) => {
    setData((prev) => ({
      ...prev,
      classes: prev.classes.map((c) => (c.id === id ? { ...c, ...input, updatedAt: new Date().toISOString() } : c)),
    }));
  }, []);
  const deleteClass: AkademikContextValue["deleteClass"] = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      classes: prev.classes.filter((c) => c.id !== id),
      teacherSubjects: prev.teacherSubjects.filter((ts) => ts.classId !== id),
    }));
  }, []);

  // ---- Subjects ----
  const addSubject: AkademikContextValue["addSubject"] = useCallback((input) => {
    const nowIso = new Date().toISOString();
    setData((prev) => ({
      ...prev,
      subjects: [{ ...input, id: genId("sub"), createdAt: nowIso, updatedAt: nowIso }, ...prev.subjects],
    }));
  }, []);
  const updateSubject: AkademikContextValue["updateSubject"] = useCallback((id, input) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.map((s) => (s.id === id ? { ...s, ...input, updatedAt: new Date().toISOString() } : s)),
    }));
  }, []);
  const deleteSubject: AkademikContextValue["deleteSubject"] = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((s) => s.id !== id),
      teacherSubjects: prev.teacherSubjects.filter((ts) => ts.subjectId !== id),
    }));
  }, []);

  // ---- Teacher-Subject assignments ----
  const addTeacherSubject: AkademikContextValue["addTeacherSubject"] = useCallback((input) => {
    setData((prev) => ({
      ...prev,
      teacherSubjects: [{ ...input, id: genId("ts"), createdAt: new Date().toISOString() }, ...prev.teacherSubjects],
    }));
  }, []);
  const deleteTeacherSubject: AkademikContextValue["deleteTeacherSubject"] = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      teacherSubjects: prev.teacherSubjects.filter((ts) => ts.id !== id),
      schedules: prev.schedules.filter((sc) => sc.teacherSubjectId !== id),
    }));
  }, []);

  // ---- Schedules ----
  const addSchedule: AkademikContextValue["addSchedule"] = useCallback((input) => {
    setData((prev) => ({
      ...prev,
      schedules: [{ ...input, id: genId("sch"), createdAt: new Date().toISOString() }, ...prev.schedules],
    }));
  }, []);
  const updateSchedule: AkademikContextValue["updateSchedule"] = useCallback((id, input) => {
    setData((prev) => ({
      ...prev,
      schedules: prev.schedules.map((sc) => (sc.id === id ? { ...sc, ...input } : sc)),
    }));
  }, []);
  const deleteSchedule: AkademikContextValue["deleteSchedule"] = useCallback((id) => {
    setData((prev) => ({ ...prev, schedules: prev.schedules.filter((sc) => sc.id !== id) }));
  }, []);

  const resetDemoData = useCallback(() => setData(loadInitial()), []);

  const value = useMemo<AkademikContextValue>(
    () => ({
      ...data,
      hydrated,
      addGrade,
      updateGrade,
      deleteGrade,
      addClass,
      updateClass,
      deleteClass,
      addSubject,
      updateSubject,
      deleteSubject,
      addTeacherSubject,
      deleteTeacherSubject,
      addSchedule,
      updateSchedule,
      deleteSchedule,
      resetDemoData,
    }),
    [
      data,
      hydrated,
      addGrade,
      updateGrade,
      deleteGrade,
      addClass,
      updateClass,
      deleteClass,
      addSubject,
      updateSubject,
      deleteSubject,
      addTeacherSubject,
      deleteTeacherSubject,
      addSchedule,
      updateSchedule,
      deleteSchedule,
      resetDemoData,
    ]
  );

  return <AkademikContext.Provider value={value}>{children}</AkademikContext.Provider>;
}

export function useAkademik() {
  const ctx = useContext(AkademikContext);
  if (!ctx) throw new Error("useAkademik must be used within AkademikProvider");
  return ctx;
}
