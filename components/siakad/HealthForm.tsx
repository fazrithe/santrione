"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { StudentHealthRecord } from "@/lib/siakad/types";
import { Field, Input, Select, Textarea } from "@/components/ui";

type Values = Omit<StudentHealthRecord, "id" | "studentId">;

const empty: Values = {
  heightCm: undefined,
  weightKg: undefined,
  bloodType: "O",
  allergies: "",
  chronicConditions: "",
  emergencyContact: "",
  recordedAt: new Date().toISOString().slice(0, 10),
  notes: "",
};

export function HealthForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: StudentHealthRecord;
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<Values>(initial ?? empty);

  function update<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.recordedAt) return;
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Tinggi Badan (cm)">
          <Input type="number" value={values.heightCm ?? ""} onChange={(e) => update("heightCm", e.target.value ? Number(e.target.value) : undefined)} />
        </Field>
        <Field label="Berat Badan (kg)">
          <Input type="number" value={values.weightKg ?? ""} onChange={(e) => update("weightKg", e.target.value ? Number(e.target.value) : undefined)} />
        </Field>
        <Field label="Golongan Darah">
          <Select value={values.bloodType} onChange={(e) => update("bloodType", e.target.value)}>
            {["A", "B", "AB", "O"].map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Alergi">
          <Input value={values.allergies} onChange={(e) => update("allergies", e.target.value)} placeholder="Tidak ada" />
        </Field>
        <Field label="Riwayat Penyakit Kronis">
          <Input value={values.chronicConditions} onChange={(e) => update("chronicConditions", e.target.value)} placeholder="Tidak ada" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Kontak Darurat">
          <Input value={values.emergencyContact} onChange={(e) => update("emergencyContact", e.target.value)} />
        </Field>
        <Field label="Tanggal Pemeriksaan" required>
          <Input type="date" value={values.recordedAt} onChange={(e) => update("recordedAt", e.target.value)} />
        </Field>
      </div>
      <Field label="Catatan Tambahan">
        <Textarea value={values.notes} onChange={(e) => update("notes", e.target.value)} />
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
