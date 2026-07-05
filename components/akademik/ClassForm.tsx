"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { ClassRoom, Grade } from "@/lib/akademik/types";
import { Field, Input, Select } from "@/components/ui";
import { teacherPool } from "@/lib/akademik/seed";

type Values = Omit<ClassRoom, "id" | "createdAt" | "updatedAt">;

export function ClassForm({
  initial,
  grades,
  onSubmit,
  onCancel,
}: {
  initial?: ClassRoom;
  grades: Grade[];
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}) {
  const empty: Values = {
    name: "",
    gradeId: grades[0]?.id ?? "",
    homeroomTeacherId: teacherPool[0]?.id ?? "",
    capacity: 32,
    academicYear: "2026/2027",
  };
  const [values, setValues] = useState<Values>(initial ?? empty);

  function update<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.name.trim()) return;
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nama Kelas" required hint="Contoh: 8A, 10 IPA 1">
          <Input value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="8A" />
        </Field>
        <Field label="Tingkatan">
          <Select value={values.gradeId} onChange={(e) => update("gradeId", e.target.value)}>
            {grades.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Wali Kelas">
        <Select value={values.homeroomTeacherId} onChange={(e) => update("homeroomTeacherId", e.target.value)}>
          {teacherPool.map((t) => (
            <option key={t.id} value={t.id}>{t.fullName}</option>
          ))}
        </Select>
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Kapasitas">
          <Input type="number" value={values.capacity} onChange={(e) => update("capacity", Number(e.target.value))} />
        </Field>
        <Field label="Tahun Ajaran">
          <Input value={values.academicYear} onChange={(e) => update("academicYear", e.target.value)} placeholder="2026/2027" />
        </Field>
      </div>
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
