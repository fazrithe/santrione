"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { TeacherSubject, Subject, ClassRoom } from "@/lib/akademik/types";
import { Field, Select } from "@/components/ui";
import { teacherPool } from "@/lib/akademik/seed";

type Values = Omit<TeacherSubject, "id" | "createdAt">;

export function TeacherSubjectForm({
  subjects,
  classes,
  onSubmit,
  onCancel,
}: {
  subjects: Subject[];
  classes: ClassRoom[];
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<Values>({
    teacherId: teacherPool[0]?.id ?? "",
    subjectId: subjects[0]?.id ?? "",
    classId: classes[0]?.id ?? "",
  });

  function update<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Guru Pengampu">
        <Select value={values.teacherId} onChange={(e) => update("teacherId", e.target.value)}>
          {teacherPool.map((t) => (
            <option key={t.id} value={t.id}>{t.fullName}</option>
          ))}
        </Select>
      </Field>
      <Field label="Mata Pelajaran">
        <Select value={values.subjectId} onChange={(e) => update("subjectId", e.target.value)}>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </Select>
      </Field>
      <Field label="Kelas">
        <Select value={values.classId} onChange={(e) => update("classId", e.target.value)}>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Select>
      </Field>
      <div className="flex justify-end gap-2 border-t border-forest-50 pt-4">
        <button type="button" onClick={onCancel} className="rounded-lg border border-forest-100 px-4 py-2 text-sm font-medium text-ink/70 hover:bg-forest-50">
          Batal
        </button>
        <button type="submit" className="rounded-lg bg-forest-700 px-4 py-2 text-sm font-medium text-white hover:bg-forest-800">
          Simpan
        </button>
      </div>
    </form>
  );
}
