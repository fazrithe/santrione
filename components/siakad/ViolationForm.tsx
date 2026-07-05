"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { StudentViolation } from "@/lib/siakad/types";
import { Field, Input, Select, Textarea } from "@/components/ui";

type Values = Omit<StudentViolation, "id" | "studentId">;

const empty: Values = {
  severity: "light",
  title: "",
  description: "",
  pointDeduction: 5,
  violationDate: new Date().toISOString().slice(0, 10),
  followUp: "",
  reportedBy: "",
};

export function ViolationForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: StudentViolation;
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
      <Field label="Judul Pelanggaran" required>
        <Input value={values.title} onChange={(e) => update("title", e.target.value)} placeholder="Terlambat mengikuti sholat berjamaah" />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Tingkat Pelanggaran">
          <Select value={values.severity} onChange={(e) => update("severity", e.target.value as StudentViolation["severity"])}>
            <option value="light">Ringan</option>
            <option value="medium">Sedang</option>
            <option value="heavy">Berat</option>
          </Select>
        </Field>
        <Field label="Poin Pengurangan">
          <Input type="number" value={values.pointDeduction} onChange={(e) => update("pointDeduction", Number(e.target.value))} />
        </Field>
        <Field label="Tanggal Kejadian">
          <Input type="date" value={values.violationDate} onChange={(e) => update("violationDate", e.target.value)} />
        </Field>
      </div>
      <Field label="Deskripsi">
        <Textarea value={values.description} onChange={(e) => update("description", e.target.value)} />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Dilaporkan Oleh">
          <Input value={values.reportedBy} onChange={(e) => update("reportedBy", e.target.value)} placeholder="Nama musyrif/musyrifah" />
        </Field>
        <Field label="Tindak Lanjut">
          <Input value={values.followUp} onChange={(e) => update("followUp", e.target.value)} placeholder="Sudah dipanggil dan dibina" />
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
