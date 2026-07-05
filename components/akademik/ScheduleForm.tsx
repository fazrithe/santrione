"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Schedule, TeacherSubject, Subject, ClassRoom } from "@/lib/akademik/types";
import { Field, Input, Select } from "@/components/ui";
import { teacherPool } from "@/lib/akademik/seed";

type Values = Omit<Schedule, "id" | "createdAt">;

export const dayLabels: Record<Schedule["day"], string> = {
  senin: "Senin",
  selasa: "Selasa",
  rabu: "Rabu",
  kamis: "Kamis",
  jumat: "Jumat",
  sabtu: "Sabtu",
};

export function ScheduleForm({
  initial,
  teacherSubjects,
  subjects,
  classes,
  onSubmit,
  onCancel,
}: {
  initial?: Schedule;
  teacherSubjects: TeacherSubject[];
  subjects: Subject[];
  classes: ClassRoom[];
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}) {
  const empty: Values = {
    teacherSubjectId: teacherSubjects[0]?.id ?? "",
    day: "senin",
    startTime: "07.00",
    endTime: "08.30",
    room: "",
  };
  const [values, setValues] = useState<Values>(initial ?? empty);

  function update<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.teacherSubjectId) return;
    onSubmit(values);
  }

  function labelFor(ts: TeacherSubject) {
    const teacher = teacherPool.find((t) => t.id === ts.teacherId)?.fullName ?? "Guru";
    const subject = subjects.find((s) => s.id === ts.subjectId)?.name ?? "Mapel";
    const cls = classes.find((c) => c.id === ts.classId)?.name ?? "Kelas";
    return `${subject} — ${cls} (${teacher})`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Penugasan Guru & Kelas" required hint="Pilih dari daftar penugasan guru yang sudah dibuat">
        <Select value={values.teacherSubjectId} onChange={(e) => update("teacherSubjectId", e.target.value)}>
          {teacherSubjects.length === 0 && <option value="">Belum ada penugasan guru</option>}
          {teacherSubjects.map((ts) => (
            <option key={ts.id} value={ts.id}>{labelFor(ts)}</option>
          ))}
        </Select>
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Hari">
          <Select value={values.day} onChange={(e) => update("day", e.target.value as Schedule["day"])}>
            {Object.entries(dayLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        </Field>
        <Field label="Jam Mulai">
          <Input value={values.startTime} onChange={(e) => update("startTime", e.target.value)} placeholder="07.00" />
        </Field>
        <Field label="Jam Selesai">
          <Input value={values.endTime} onChange={(e) => update("endTime", e.target.value)} placeholder="08.30" />
        </Field>
      </div>
      <Field label="Ruang">
        <Input value={values.room} onChange={(e) => update("room", e.target.value)} placeholder="R. Kelas A" />
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
