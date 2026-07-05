"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { StudentAchievement } from "@/lib/siakad/types";
import { Field, Input, Select, Textarea } from "@/components/ui";

type Values = Omit<StudentAchievement, "id" | "studentId">;

const empty: Values = {
  title: "",
  level: "school",
  category: "",
  achievedDate: new Date().toISOString().slice(0, 10),
  description: "",
};

export const achievementLevelLabels: Record<StudentAchievement["level"], string> = {
  school: "Sekolah",
  district: "Kecamatan",
  city: "Kota/Kabupaten",
  province: "Provinsi",
  national: "Nasional",
  international: "Internasional",
};

export function AchievementForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: StudentAchievement;
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<Values>(initial ?? empty);

  function update<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.title.trim()) return;
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Judul Prestasi" required>
        <Input value={values.title} onChange={(e) => update("title", e.target.value)} placeholder="Juara 1 Musabaqah Tilawatil Qur'an" />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Tingkat">
          <Select value={values.level} onChange={(e) => update("level", e.target.value as StudentAchievement["level"])}>
            {Object.entries(achievementLevelLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        </Field>
        <Field label="Tanggal Diraih">
          <Input type="date" value={values.achievedDate} onChange={(e) => update("achievedDate", e.target.value)} />
        </Field>
      </div>
      <Field label="Kategori">
        <Input value={values.category} onChange={(e) => update("category", e.target.value)} placeholder="Akademik / Non-Akademik" />
      </Field>
      <Field label="Deskripsi">
        <Textarea value={values.description} onChange={(e) => update("description", e.target.value)} />
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
