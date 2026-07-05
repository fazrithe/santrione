"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { UserPlus, Search, Pencil, Trash2, Eye, RotateCcw, X } from "lucide-react";
import {
  PageHeader,
  StatCard,
  TableShell,
  Th,
  Td,
  Badge,
  Select,
  EmptyState,
} from "@/components/ui";
import { Modal } from "@/components/Modal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/components/Toast";
import { useSiakad } from "@/lib/siakad/store";
import { StudentForm } from "@/components/siakad/StudentForm";
import { classNames } from "@/lib/siakad/seed";
import type { Student } from "@/lib/siakad/types";
import { Users, GraduationCap, Building2, UserX } from "lucide-react";

const PAGE_SIZE = 10;

export default function SantriPage() {
  const { students, addStudent, updateStudent, deleteStudent, resetDemoData } = useSiakad();
  const { show } = useToast();

  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [deleting, setDeleting] = useState<Student | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        s.fullName.toLowerCase().includes(q) ||
        s.nis.toLowerCase().includes(q) ||
        s.nisn.toLowerCase().includes(q);
      const matchesClass = !classFilter || s.className === classFilter;
      const matchesStatus = !statusFilter || s.status === statusFilter;
      const matchesGender = !genderFilter || s.gender === genderFilter;
      return matchesQuery && matchesClass && matchesStatus && matchesGender;
    });
  }, [students, query, classFilter, statusFilter, genderFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const active = students.filter((s) => s.status === "active").length;
  const alumni = students.filter((s) => s.status === "alumni").length;
  const dropout = students.filter((s) => s.status === "dropout").length;

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(s: Student) {
    setEditing(s);
    setFormOpen(true);
  }

  function handleSubmit(values: Omit<Student, "id" | "photoInitials" | "createdAt" | "updatedAt">) {
    if (editing) {
      updateStudent(editing.id, values);
      show(`Data ${values.fullName} berhasil diperbarui.`, "success");
    } else {
      addStudent(values);
      show(`Santri ${values.fullName} berhasil ditambahkan.`, "success");
    }
    setFormOpen(false);
    setEditing(null);
  }

  function handleDeleteConfirm() {
    if (!deleting) return;
    deleteStudent(deleting.id);
    show(`Data ${deleting.fullName} telah dihapus.`, "info");
    setDeleting(null);
  }

  function handleResetConfirm() {
    resetDemoData();
    setResetConfirmOpen(false);
    show("Data SIAKAD dikembalikan ke data demo awal.", "info");
  }

  const hasFilters = query || classFilter || statusFilter || genderFilter;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="SIAKAD"
        title="Data Induk Santri"
        description="Registri utama seluruh santri: identitas, kelas, asrama, dan status keaktifan. Tambah, ubah, dan hapus data langsung dari sini."
        action={
          <div className="flex gap-2">
            <button
              onClick={() => setResetConfirmOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-forest-100 bg-white px-3.5 py-2 text-sm font-medium text-ink/60 shadow-soft hover:bg-forest-50"
              title="Kembalikan ke data demo awal"
            >
              <RotateCcw size={15} /> Reset Demo
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white shadow-soft hover:bg-forest-800"
            >
              <UserPlus size={15} /> Tambah Santri
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Santri Terdaftar" value={String(students.length)} icon={Users} />
        <StatCard label="Santri Aktif" value={String(active)} icon={GraduationCap} accent="gold" />
        <StatCard label="Alumni" value={String(alumni)} icon={Building2} />
        <StatCard label="Keluar / Dropout" value={String(dropout)} icon={UserX} trendUp={false} accent="gold" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-forest-100 bg-white p-4 shadow-soft sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-forest-100 bg-forest-50/40 px-3 py-2">
          <Search size={16} className="text-ink/40" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Cari nama, NIS, atau NISN..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
          />
        </div>
        <Select
          value={classFilter}
          onChange={(e) => {
            setClassFilter(e.target.value);
            setPage(1);
          }}
          className="sm:w-40"
        >
          <option value="">Semua Kelas</option>
          {classNames.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
        <Select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="sm:w-40"
        >
          <option value="">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="alumni">Alumni</option>
          <option value="dropout">Dropout</option>
          <option value="transferred">Pindah</option>
          <option value="graduated">Lulus</option>
        </Select>
        <Select
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setPage(1);
          }}
          className="sm:w-40"
        >
          <option value="">Semua JK</option>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </Select>
        {hasFilters && (
          <button
            onClick={() => {
              setQuery("");
              setClassFilter("");
              setStatusFilter("");
              setGenderFilter("");
              setPage(1);
            }}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink/50 hover:bg-forest-50"
          >
            <X size={14} /> Reset filter
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-forest-100 bg-white shadow-soft">
          <EmptyState
            title="Tidak ada santri yang cocok"
            description="Coba ubah kata kunci pencarian atau filter yang digunakan."
          />
        </div>
      ) : (
        <>
          <TableShell>
            <thead className="bg-forest-50/60">
              <tr>
                <Th>NIS</Th>
                <Th>Nama Lengkap</Th>
                <Th>JK</Th>
                <Th>Kelas</Th>
                <Th>Asrama / Kamar</Th>
                <Th>Wali Santri</Th>
                <Th>Tahun Masuk</Th>
                <Th>Status</Th>
                <Th className="text-right">Aksi</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-50">
              {paginated.map((s) => (
                <tr key={s.id} className="hover:bg-forest-50/40">
                  <Td className="font-mono text-xs">{s.nis}</Td>
                  <Td>
                    <Link href={`/santri/${s.id}`} className="group flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-100 text-xs font-semibold text-forest-700">
                        {s.photoInitials}
                      </span>
                      <span className="font-medium text-ink group-hover:text-forest-700 group-hover:underline">
                        {s.fullName}
                      </span>
                    </Link>
                  </Td>
                  <Td>{s.gender}</Td>
                  <Td>{s.className}</Td>
                  <Td>{s.dormitory}</Td>
                  <Td>{s.phone || "—"}</Td>
                  <Td>{s.entryYear}</Td>
                  <Td><Badge status={s.status} /></Td>
                  <Td>
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/santri/${s.id}`}
                        className="rounded-md p-1.5 text-ink/50 hover:bg-forest-50 hover:text-forest-700"
                        title="Lihat detail"
                      >
                        <Eye size={15} />
                      </Link>
                      <button
                        onClick={() => openEdit(s)}
                        className="rounded-md p-1.5 text-ink/50 hover:bg-forest-50 hover:text-forest-700"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleting(s)}
                        className="rounded-md p-1.5 text-ink/50 hover:bg-red-50 hover:text-red-500"
                        title="Hapus"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>

          <div className="flex items-center justify-between text-sm text-ink/50">
            <p>
              Menampilkan {(currentPage - 1) * PAGE_SIZE + 1}
              &ndash;{Math.min(currentPage * PAGE_SIZE, filtered.length)} dari {filtered.length} santri
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-forest-100 bg-white px-3 py-1.5 font-medium disabled:opacity-40"
              >
                Sebelumnya
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-forest-100 bg-white px-3 py-1.5 font-medium disabled:opacity-40"
              >
                Berikutnya
              </button>
            </div>
          </div>
        </>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit Data Santri" : "Tambah Santri Baru"}
        description={editing ? `Perbarui data ${editing.fullName}` : "Lengkapi data induk santri baru"}
        width="lg"
      >
        <StudentForm
          initial={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
          submitLabel={editing ? "Simpan Perubahan" : "Tambah Santri"}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Hapus data ${deleting?.fullName ?? ""}?`}
        description="Tindakan ini akan menghapus data santri beserta seluruh data terkait (wali, dokumen, kesehatan, prestasi, pelanggaran). Tidak dapat dibatalkan."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleting(null)}
      />

      <ConfirmDialog
        open={resetConfirmOpen}
        title="Reset ke data demo awal?"
        description="Seluruh perubahan yang telah Anda buat pada modul SIAKAD (tambah/ubah/hapus) akan dikembalikan ke data contoh awal."
        confirmLabel="Reset"
        danger={false}
        onConfirm={handleResetConfirm}
        onCancel={() => setResetConfirmOpen(false)}
      />
    </div>
  );
}
