"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Pencil, Trash2, Plus, Phone, MapPin, Cake, BookOpen,
  Home, Calendar, ShieldAlert, Award, HeartPulse, FileText, Users2,
} from "lucide-react";
import { Card, Badge, TableShell, Th, Td, EmptyState } from "@/components/ui";
import { Tabs } from "@/components/Tabs";
import { Modal } from "@/components/Modal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/components/Toast";
import { useSiakad } from "@/lib/siakad/store";
import { StudentForm } from "@/components/siakad/StudentForm";
import { ParentForm } from "@/components/siakad/ParentForm";
import { DocumentForm, documentTypeLabels } from "@/components/siakad/DocumentForm";
import { HealthForm } from "@/components/siakad/HealthForm";
import { AchievementForm, achievementLevelLabels } from "@/components/siakad/AchievementForm";
import { ViolationForm } from "@/components/siakad/ViolationForm";
import { formatDate } from "@/lib/utils";
import type {
  Student, StudentParent, StudentDocument, StudentHealthRecord, StudentAchievement, StudentViolation,
} from "@/lib/siakad/types";

const statusLabels: Record<Student["status"], string> = {
  active: "Aktif",
  alumni: "Alumni",
  dropout: "Dropout",
  transferred: "Pindah",
  graduated: "Lulus",
};

export default function StudentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { show } = useToast();
  const { getStudent, updateStudent, deleteStudent } = useSiakad();
  const student = getStudent(params.id);

  const [tab, setTab] = useState("profil");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    getParentsByStudent, getDocumentsByStudent, getHealthRecordsByStudent,
    getAchievementsByStudent, getViolationsByStudent,
  } = useSiakad();

  if (!student) {
    return (
      <Card>
        <EmptyState
          title="Data santri tidak ditemukan"
          description="Santri mungkin sudah dihapus atau tautan tidak valid."
        />
        <div className="flex justify-center pb-6">
          <Link href="/santri" className="text-sm font-medium text-forest-700 hover:underline">
            Kembali ke daftar santri
          </Link>
        </div>
      </Card>
    );
  }

  const parents = getParentsByStudent(student.id);
  const documents = getDocumentsByStudent(student.id);
  const healthRecords = getHealthRecordsByStudent(student.id);
  const achievements = getAchievementsByStudent(student.id);
  const violations = getViolationsByStudent(student.id);

  function handleEditSubmit(values: Omit<Student, "id" | "photoInitials" | "createdAt" | "updatedAt">) {
    updateStudent(student!.id, values);
    show(`Data ${values.fullName} berhasil diperbarui.`, "success");
    setEditOpen(false);
  }

  function handleDelete() {
    deleteStudent(student!.id);
    show(`Data ${student!.fullName} telah dihapus.`, "info");
    router.push("/santri");
  }

  return (
    <div className="space-y-6">
      <Link href="/santri" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/50 hover:text-forest-700">
        <ArrowLeft size={15} /> Kembali ke daftar santri
      </Link>

      {/* Profile header */}
      <Card className="p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-forest-100 font-display text-xl font-semibold text-forest-700">
              {student.photoInitials}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl font-semibold text-ink">{student.fullName}</h2>
                <Badge status={student.status} label={statusLabels[student.status]} />
              </div>
              <p className="mt-0.5 text-sm text-ink/50">
                NIS {student.nis} &middot; NISN {student.nisn} &middot; {student.gender === "L" ? "Laki-laki" : "Perempuan"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink/60">
                <span className="flex items-center gap-1 rounded-full bg-forest-50 px-2.5 py-1">
                  <BookOpen size={12} /> Kelas {student.className}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-forest-50 px-2.5 py-1">
                  <Home size={12} /> {student.dormitory}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-forest-50 px-2.5 py-1">
                  <Calendar size={12} /> Masuk {student.entryYear}
                </span>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-forest-100 bg-white px-3.5 py-2 text-sm font-medium text-ink/70 shadow-soft hover:bg-forest-50"
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-red-100 bg-white px-3.5 py-2 text-sm font-medium text-red-500 shadow-soft hover:bg-red-50"
            >
              <Trash2 size={14} /> Hapus
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { key: "profil", label: "Profil" },
            { key: "wali", label: "Wali Santri", count: parents.length },
            { key: "dokumen", label: "Dokumen", count: documents.length },
            { key: "kesehatan", label: "Kesehatan", count: healthRecords.length },
            { key: "prestasi", label: "Prestasi", count: achievements.length },
            { key: "pelanggaran", label: "Pelanggaran", count: violations.length },
          ]}
        />

        <div className="p-5">
          {tab === "profil" && <ProfilTab student={student} />}
          {tab === "wali" && <WaliTab studentId={student.id} parents={parents} />}
          {tab === "dokumen" && <DokumenTab studentId={student.id} documents={documents} />}
          {tab === "kesehatan" && <KesehatanTab studentId={student.id} records={healthRecords} />}
          {tab === "prestasi" && <PrestasiTab studentId={student.id} achievements={achievements} />}
          {tab === "pelanggaran" && <PelanggaranTab studentId={student.id} violations={violations} />}
        </div>
      </Card>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Data Santri" width="lg">
        <StudentForm initial={student} onSubmit={handleEditSubmit} onCancel={() => setEditOpen(false)} submitLabel="Simpan Perubahan" />
      </Modal>

      <ConfirmDialog
        open={deleteOpen}
        title={`Hapus data ${student.fullName}?`}
        description="Tindakan ini akan menghapus data santri beserta seluruh data terkait. Tidak dapat dibatalkan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}

// ---------------------------------------------------------------
// Profil tab
// ---------------------------------------------------------------

function ProfilTab({ student }: { student: Student }) {
  const rows: { icon: typeof Cake; label: string; value: string }[] = [
    { icon: Cake, label: "Tempat, Tanggal Lahir", value: `${student.placeOfBirth}, ${formatDate(student.dateOfBirth)}` },
    { icon: Users2, label: "Agama", value: student.religion },
    { icon: MapPin, label: "Provinsi Asal", value: student.province },
    { icon: Phone, label: "No. HP / WA", value: student.phone || "—" },
  ];

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.label} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-600">
            <r.icon size={15} />
          </span>
          <div>
            <p className="text-xs text-ink/45">{r.label}</p>
            <p className="text-sm font-medium text-ink">{r.value}</p>
          </div>
        </div>
      ))}
      <div className="flex items-start gap-3 sm:col-span-2">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-600">
          <Home size={15} />
        </span>
        <div>
          <p className="text-xs text-ink/45">Alamat Lengkap</p>
          <p className="text-sm font-medium text-ink">{student.address}</p>
        </div>
      </div>
      <p className="text-xs text-ink/35 sm:col-span-2">
        Dibuat {formatDate(student.createdAt)} &middot; Diperbarui terakhir {formatDate(student.updatedAt)}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------
// Wali Santri tab
// ---------------------------------------------------------------

function WaliTab({ studentId, parents }: { studentId: string; parents: StudentParent[] }) {
  const { addParent, updateParent, deleteParent } = useSiakad();
  const { show } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<StudentParent | null>(null);
  const [deleting, setDeleting] = useState<StudentParent | null>(null);

  function handleSubmit(values: Omit<StudentParent, "id" | "studentId">) {
    if (editing) {
      updateParent(editing.id, values);
      show("Data wali santri diperbarui.", "success");
    } else {
      addParent({ ...values, studentId });
      show("Wali santri berhasil ditambahkan.", "success");
    }
    setFormOpen(false);
    setEditing(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-1.5 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-forest-800"
        >
          <Plus size={14} /> Tambah Wali
        </button>
      </div>

      {parents.length === 0 ? (
        <EmptyState title="Belum ada data wali santri" description="Tambahkan data orang tua atau wali untuk santri ini." />
      ) : (
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Nama</Th>
              <Th>Hubungan</Th>
              <Th>Pekerjaan</Th>
              <Th>No. HP</Th>
              <Th>Kontak Utama</Th>
              <Th className="text-right">Aksi</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {parents.map((p) => (
              <tr key={p.id} className="hover:bg-forest-50/40">
                <Td className="font-medium text-ink">{p.fullName}</Td>
                <Td>{p.relationship}</Td>
                <Td>{p.occupation || "—"}</Td>
                <Td>{p.phone || "—"}</Td>
                <Td>{p.isPrimaryContact ? <Badge status="active" label="Utama" /> : "—"}</Td>
                <Td>
                  <div className="flex justify-end gap-1">
                    <button onClick={() => { setEditing(p); setFormOpen(true); }} className="rounded-md p-1.5 text-ink/50 hover:bg-forest-50 hover:text-forest-700">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleting(p)} className="rounded-md p-1.5 text-ink/50 hover:bg-red-50 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Wali Santri" : "Tambah Wali Santri"}>
        <ParentForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Hapus data ${deleting?.fullName ?? ""}?`}
        onConfirm={() => { if (deleting) { deleteParent(deleting.id); show("Data wali dihapus.", "info"); } setDeleting(null); }}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

// ---------------------------------------------------------------
// Dokumen tab
// ---------------------------------------------------------------

function DokumenTab({ studentId, documents }: { studentId: string; documents: StudentDocument[] }) {
  const { addDocument, deleteDocument } = useSiakad();
  const { show } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<StudentDocument | null>(null);

  function handleSubmit(values: Omit<StudentDocument, "id" | "studentId">) {
    addDocument({ ...values, studentId });
    show("Dokumen berhasil ditambahkan.", "success");
    setFormOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setFormOpen(true)} className="flex items-center gap-1.5 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-forest-800">
          <Plus size={14} /> Tambah Dokumen
        </button>
      </div>

      {documents.length === 0 ? (
        <EmptyState title="Belum ada dokumen" description="Tambahkan dokumen administrasi santri seperti akta lahir atau kartu keluarga." />
      ) : (
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Jenis Dokumen</Th>
              <Th>Nama File</Th>
              <Th>Nomor</Th>
              <Th>Tanggal Terbit</Th>
              <Th className="text-right">Aksi</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {documents.map((d) => (
              <tr key={d.id} className="hover:bg-forest-50/40">
                <Td className="flex items-center gap-2 font-medium text-ink">
                  <FileText size={14} className="text-forest-500" /> {documentTypeLabels[d.documentType]}
                </Td>
                <Td className="font-mono text-xs">{d.fileName}</Td>
                <Td>{d.fileNumber || "—"}</Td>
                <Td>{d.issuedDate ? formatDate(d.issuedDate) : "—"}</Td>
                <Td>
                  <div className="flex justify-end">
                    <button onClick={() => setDeleting(d)} className="rounded-md p-1.5 text-ink/50 hover:bg-red-50 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title="Tambah Dokumen">
        <DocumentForm onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title="Hapus dokumen ini?"
        onConfirm={() => { if (deleting) { deleteDocument(deleting.id); show("Dokumen dihapus.", "info"); } setDeleting(null); }}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

// ---------------------------------------------------------------
// Kesehatan tab
// ---------------------------------------------------------------

function KesehatanTab({ studentId, records }: { studentId: string; records: StudentHealthRecord[] }) {
  const { addHealthRecord, updateHealthRecord, deleteHealthRecord } = useSiakad();
  const { show } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<StudentHealthRecord | null>(null);
  const [deleting, setDeleting] = useState<StudentHealthRecord | null>(null);

  function handleSubmit(values: Omit<StudentHealthRecord, "id" | "studentId">) {
    if (editing) {
      updateHealthRecord(editing.id, values);
      show("Rekam kesehatan diperbarui.", "success");
    } else {
      addHealthRecord({ ...values, studentId });
      show("Rekam kesehatan ditambahkan.", "success");
    }
    setFormOpen(false);
    setEditing(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => { setEditing(null); setFormOpen(true); }} className="flex items-center gap-1.5 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-forest-800">
          <Plus size={14} /> Tambah Rekam Kesehatan
        </button>
      </div>

      {records.length === 0 ? (
        <EmptyState title="Belum ada rekam kesehatan" description="Tambahkan hasil pemeriksaan kesehatan berkala santri." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {records.map((r) => (
            <div key={r.id} className="rounded-xl border border-forest-100 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-50 text-forest-600">
                    <HeartPulse size={15} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">Pemeriksaan {formatDate(r.recordedAt)}</p>
                    <p className="text-xs text-ink/45">Gol. Darah {r.bloodType || "—"}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditing(r); setFormOpen(true); }} className="rounded-md p-1.5 text-ink/50 hover:bg-forest-50 hover:text-forest-700">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => setDeleting(r)} className="rounded-md p-1.5 text-ink/50 hover:bg-red-50 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-ink/60">
                <p>Tinggi: <span className="font-medium text-ink">{r.heightCm ? `${r.heightCm} cm` : "—"}</span></p>
                <p>Berat: <span className="font-medium text-ink">{r.weightKg ? `${r.weightKg} kg` : "—"}</span></p>
                <p className="col-span-2">Alergi: <span className="font-medium text-ink">{r.allergies || "Tidak ada"}</span></p>
                <p className="col-span-2">Penyakit Kronis: <span className="font-medium text-ink">{r.chronicConditions || "Tidak ada"}</span></p>
                {r.notes && <p className="col-span-2 text-ink/50">Catatan: {r.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Rekam Kesehatan" : "Tambah Rekam Kesehatan"}>
        <HealthForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title="Hapus rekam kesehatan ini?"
        onConfirm={() => { if (deleting) { deleteHealthRecord(deleting.id); show("Rekam kesehatan dihapus.", "info"); } setDeleting(null); }}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

// ---------------------------------------------------------------
// Prestasi tab
// ---------------------------------------------------------------

function PrestasiTab({ studentId, achievements }: { studentId: string; achievements: StudentAchievement[] }) {
  const { addAchievement, updateAchievement, deleteAchievement } = useSiakad();
  const { show } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<StudentAchievement | null>(null);
  const [deleting, setDeleting] = useState<StudentAchievement | null>(null);

  function handleSubmit(values: Omit<StudentAchievement, "id" | "studentId">) {
    if (editing) {
      updateAchievement(editing.id, values);
      show("Prestasi diperbarui.", "success");
    } else {
      addAchievement({ ...values, studentId });
      show("Prestasi berhasil ditambahkan.", "success");
    }
    setFormOpen(false);
    setEditing(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => { setEditing(null); setFormOpen(true); }} className="flex items-center gap-1.5 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-forest-800">
          <Plus size={14} /> Tambah Prestasi
        </button>
      </div>

      {achievements.length === 0 ? (
        <EmptyState title="Belum ada prestasi tercatat" description="Catat pencapaian akademik maupun non-akademik santri di sini." />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {achievements.map((a) => (
            <div key={a.id} className="flex items-start justify-between gap-3 rounded-xl border border-forest-100 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                  <Award size={16} />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{a.title}</p>
                  <p className="mt-0.5 text-xs text-ink/50">
                    Tingkat {achievementLevelLabels[a.level]} &middot; {formatDate(a.achievedDate)}
                  </p>
                  {a.description && <p className="mt-1 text-xs text-ink/45">{a.description}</p>}
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => { setEditing(a); setFormOpen(true); }} className="rounded-md p-1.5 text-ink/50 hover:bg-forest-50 hover:text-forest-700">
                  <Pencil size={14} />
                </button>
                <button onClick={() => setDeleting(a)} className="rounded-md p-1.5 text-ink/50 hover:bg-red-50 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Prestasi" : "Tambah Prestasi"}>
        <AchievementForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Hapus prestasi "${deleting?.title ?? ""}"?`}
        onConfirm={() => { if (deleting) { deleteAchievement(deleting.id); show("Prestasi dihapus.", "info"); } setDeleting(null); }}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

// ---------------------------------------------------------------
// Pelanggaran tab
// ---------------------------------------------------------------

function PelanggaranTab({ studentId, violations }: { studentId: string; violations: StudentViolation[] }) {
  const { addViolation, updateViolation, deleteViolation } = useSiakad();
  const { show } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<StudentViolation | null>(null);
  const [deleting, setDeleting] = useState<StudentViolation | null>(null);

  const totalPoints = violations.reduce((sum, v) => sum + v.pointDeduction, 0);

  function handleSubmit(values: Omit<StudentViolation, "id" | "studentId">) {
    if (editing) {
      updateViolation(editing.id, values);
      show("Data pelanggaran diperbarui.", "success");
    } else {
      addViolation({ ...values, studentId });
      show("Pelanggaran berhasil dicatat.", "success");
    }
    setFormOpen(false);
    setEditing(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-ink/60">
          <ShieldAlert size={16} className="text-red-500" />
          Total poin pengurangan: <span className="font-semibold text-ink">{totalPoints}</span>
        </div>
        <button onClick={() => { setEditing(null); setFormOpen(true); }} className="flex items-center gap-1.5 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-forest-800">
          <Plus size={14} /> Catat Pelanggaran
        </button>
      </div>

      {violations.length === 0 ? (
        <EmptyState title="Tidak ada catatan pelanggaran" description="Riwayat kedisiplinan santri ini bersih." />
      ) : (
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Tanggal</Th>
              <Th>Pelanggaran</Th>
              <Th>Tingkat</Th>
              <Th>Poin</Th>
              <Th>Dilaporkan Oleh</Th>
              <Th className="text-right">Aksi</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {violations.map((v) => (
              <tr key={v.id} className="hover:bg-forest-50/40">
                <Td>{formatDate(v.violationDate)}</Td>
                <Td className="font-medium text-ink">{v.title}</Td>
                <Td><Badge status={v.severity === "heavy" ? "overdue" : v.severity === "medium" ? "pending" : "active"} label={v.severity === "light" ? "Ringan" : v.severity === "medium" ? "Sedang" : "Berat"} /></Td>
                <Td className="font-mono">-{v.pointDeduction}</Td>
                <Td>{v.reportedBy || "—"}</Td>
                <Td>
                  <div className="flex justify-end gap-1">
                    <button onClick={() => { setEditing(v); setFormOpen(true); }} className="rounded-md p-1.5 text-ink/50 hover:bg-forest-50 hover:text-forest-700">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleting(v)} className="rounded-md p-1.5 text-ink/50 hover:bg-red-50 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Pelanggaran" : "Catat Pelanggaran"}>
        <ViolationForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Hapus catatan "${deleting?.title ?? ""}"?`}
        onConfirm={() => { if (deleting) { deleteViolation(deleting.id); show("Catatan pelanggaran dihapus.", "info"); } setDeleting(null); }}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
