"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { StudentDocument } from "@/lib/siakad/types";
import { Field, Input, Select } from "@/components/ui";

type Values = Omit<StudentDocument, "id" | "studentId">;

const empty: Values = {
  documentType: "akta_lahir",
  fileName: "",
  fileNumber: "",
  issuedDate: "",
};

export const documentTypeLabels: Record<StudentDocument["documentType"], string> = {
  akta_lahir: "Akta Lahir",
  kartu_keluarga: "Kartu Keluarga",
  ktp: "KTP",
  ijazah: "Ijazah",
  pas_foto: "Pas Foto",
  kartu_kesehatan: "Kartu Kesehatan",
  surat_pindah: "Surat Pindah",
  other: "Lainnya",
};

export function DocumentForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<Values>(empty);

  function update<K extends keyof Values>(key: K, val: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.fileName.trim()) return;
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Jenis Dokumen">
        <Select value={values.documentType} onChange={(e) => update("documentType", e.target.value as StudentDocument["documentType"])}>
          {Object.entries(documentTypeLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
      </Field>
      <Field label="Nama File" required hint="Nama file dummy — pada versi produksi ini akan berupa unggahan berkas asli.">
        <Input value={values.fileName} onChange={(e) => update("fileName", e.target.value)} placeholder="akta_lahir_20261000.pdf" />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nomor Dokumen">
          <Input value={values.fileNumber} onChange={(e) => update("fileNumber", e.target.value)} />
        </Field>
        <Field label="Tanggal Terbit">
          <Input type="date" value={values.issuedDate} onChange={(e) => update("issuedDate", e.target.value)} />
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
