"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Student } from "@/lib/siakad/types";
import { classNames, dormitoryRoomNames, provinces } from "@/lib/siakad/seed";
import { Field, Input, Select, Textarea } from "@/components/ui";

type StudentFormValues = Omit<Student, "id" | "photoInitials" | "createdAt" | "updatedAt">;

const emptyValues: StudentFormValues = {
  nis: "",
  nisn: "",
  fullName: "",
  nickname: "",
  gender: "L",
  religion: "Islam",
  placeOfBirth: "",
  dateOfBirth: "",
  province: provinces[0],
  address: "",
  phone: "",
  className: classNames[0],
  dormitory: dormitoryRoomNames[0],
  entryYear: new Date().getFullYear(),
  status: "active",
};

export function StudentForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Simpan",
}: {
  initial?: Student;
  onSubmit: (values: StudentFormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<StudentFormValues>(
    initial
      ? {
          nis: initial.nis,
          nisn: initial.nisn,
          fullName: initial.fullName,
          nickname: initial.nickname ?? "",
          gender: initial.gender,
          religion: initial.religion,
          placeOfBirth: initial.placeOfBirth,
          dateOfBirth: initial.dateOfBirth,
          province: initial.province,
          address: initial.address,
          phone: initial.phone ?? "",
          className: initial.className,
          dormitory: initial.dormitory,
          entryYear: initial.entryYear,
          status: initial.status,
        }
      : emptyValues
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof StudentFormValues>(key: K, val: StudentFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!values.nis.trim()) next.nis = "NIS wajib diisi";
    if (!values.fullName.trim()) next.fullName = "Nama lengkap wajib diisi";
    if (!values.dateOfBirth) next.dateOfBirth = "Tanggal lahir wajib diisi";
    if (!values.address.trim()) next.address = "Alamat wajib diisi";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="NIS" required>
          <Input value={values.nis} onChange={(e) => update("nis", e.target.value)} placeholder="20261000" />
          {errors.nis && <p className="mt-1 text-xs text-red-500">{errors.nis}</p>}
        </Field>
        <Field label="NISN">
          <Input value={values.nisn} onChange={(e) => update("nisn", e.target.value)} placeholder="0098765" />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nama Lengkap" required>
          <Input value={values.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Ahmad Fauzan Ridho" />
          {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
        </Field>
        <Field label="Nama Panggilan">
          <Input value={values.nickname} onChange={(e) => update("nickname", e.target.value)} placeholder="Fauzan" />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Jenis Kelamin" required>
          <Select value={values.gender} onChange={(e) => update("gender", e.target.value as Student["gender"])}>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </Select>
        </Field>
        <Field label="Tempat Lahir">
          <Input value={values.placeOfBirth} onChange={(e) => update("placeOfBirth", e.target.value)} placeholder="Bandung" />
        </Field>
        <Field label="Tanggal Lahir" required>
          <Input type="date" value={values.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} />
          {errors.dateOfBirth && <p className="mt-1 text-xs text-red-500">{errors.dateOfBirth}</p>}
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Provinsi Asal">
          <Select value={values.province} onChange={(e) => update("province", e.target.value)}>
            {provinces.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </Select>
        </Field>
        <Field label="No. HP / WA Wali">
          <Input value={values.phone} onChange={(e) => update("phone", e.target.value)} placeholder="081234567890" />
        </Field>
      </div>

      <Field label="Alamat Lengkap" required>
        <Textarea value={values.address} onChange={(e) => update("address", e.target.value)} placeholder="Jl. Pesantren No. 1, RT/RW ..." />
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Kelas">
          <Select value={values.className} onChange={(e) => update("className", e.target.value)}>
            {classNames.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Kamar Asrama">
          <Select value={values.dormitory} onChange={(e) => update("dormitory", e.target.value)}>
            {dormitoryRoomNames.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </Select>
        </Field>
        <Field label="Tahun Masuk">
          <Input
            type="number"
            value={values.entryYear}
            onChange={(e) => update("entryYear", Number(e.target.value))}
            min={2000}
            max={2100}
          />
        </Field>
        <Field label="Status">
          <Select value={values.status} onChange={(e) => update("status", e.target.value as Student["status"])}>
            <option value="active">Aktif</option>
            <option value="alumni">Alumni</option>
            <option value="dropout">Dropout</option>
            <option value="transferred">Pindah</option>
            <option value="graduated">Lulus</option>
          </Select>
        </Field>
      </div>

      <div className="flex justify-end gap-2 border-t border-forest-50 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-forest-100 px-4 py-2 text-sm font-medium text-ink/70 hover:bg-forest-50"
        >
          Batal
        </button>
        <button
          type="submit"
          className="rounded-lg bg-forest-700 px-4 py-2 text-sm font-medium text-white hover:bg-forest-800"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
