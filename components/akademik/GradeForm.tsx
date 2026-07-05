"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Grade } from "@/lib/akademik/types";
import { Field, Input } from "@/components/ui";

type Values = Omit<Grade, "id" | "createdAt" | "updatedAt">;

const empty: Values = { name: "", level: 7 };

export function GradeForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Grade;
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}) {
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
      <Field label="Nama Tingkatan" required hint="Contoh: Kelas 7, Kelas 10">
        <Input value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Kelas 7" />
      </Field>
      <Field label="Level Urutan" hint="Digunakan untuk mengurutkan tingkatan">
        <Input type="number" value={values.level} onChange={(e) => update("level", Number(e.target.value))} />
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
