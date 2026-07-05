"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { StudentParent } from "@/lib/siakad/types";
import { Field, Input, Select, Textarea } from "@/components/ui";

type Values = Omit<StudentParent, "id" | "studentId">;

const empty: Values = {
  fullName: "",
  relationship: "Ayah",
  nik: "",
  occupation: "",
  phone: "",
  email: "",
  address: "",
  isPrimaryContact: false,
};

export function ParentForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: StudentParent;
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<Values>(initial ?? empty);

  function update<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.fullName.trim()) return;
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nama Lengkap" required>
          <Input value={values.fullName} onChange={(e) => update("fullName", e.target.value)} />
        </Field>
        <Field label="Hubungan">
          <Select value={values.relationship} onChange={(e) => update("relationship", e.target.value as Values["relationship"])}>
            <option value="Ayah">Ayah</option>
            <option value="Ibu">Ibu</option>
            <option value="Wali">Wali</option>
          </Select>
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="NIK">
          <Input value={values.nik} onChange={(e) => update("nik", e.target.value)} />
        </Field>
        <Field label="Pekerjaan">
          <Input value={values.occupation} onChange={(e) => update("occupation", e.target.value)} />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="No. HP / WA">
          <Input value={values.phone} onChange={(e) => update("phone", e.target.value)} />
        </Field>
        <Field label="Email">
          <Input type="email" value={values.email} onChange={(e) => update("email", e.target.value)} />
        </Field>
      </div>
      <Field label="Alamat">
        <Textarea value={values.address} onChange={(e) => update("address", e.target.value)} />
      </Field>
      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={values.isPrimaryContact}
          onChange={(e) => update("isPrimaryContact", e.target.checked)}
          className="h-4 w-4 rounded border-forest-200 text-forest-600 focus:ring-forest-300"
        />
        Jadikan kontak utama
      </label>

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
