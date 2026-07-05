"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Subject } from "@/lib/akademik/types";
import { Field, Input, Select } from "@/components/ui";

type Values = Omit<Subject, "id" | "createdAt" | "updatedAt">;

const empty: Values = { code: "", name: "", category: "umum", creditHours: 2 };

export const categoryLabels: Record<Subject["category"], string> = {
  umum: "Umum",
  diniyah: "Diniyah",
  muatan_lokal: "Muatan Lokal",
};

export function SubjectForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Subject;
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<Values>(initial ?? empty);

  function update<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.name.trim() || !values.code.trim()) return;
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Kode Mapel" required>
          <Input value={values.code} onChange={(e) => update("code", e.target.value)} placeholder="MTK-01" />
        </Field>
        <Field label="Nama Mata Pelajaran" required>
          <Input value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Matematika" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Kategori">
          <Select value={values.category} onChange={(e) => update("category", e.target.value as Subject["category"])}>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        </Field>
        <Field label="Jam Pelajaran / Minggu">
          <Input type="number" value={values.creditHours} onChange={(e) => update("creditHours", Number(e.target.value))} />
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
