"use client";

import { useMemo, useState } from "react";
import {
  Plus, Pencil, Trash2, Users, RotateCcw, LayoutGrid, School, BookOpen, UserCog, CalendarClock,
} from "lucide-react";
import {
  PageHeader, Card, StatCard, TableShell, Th, Td, ProgressBar, EmptyState, Badge, Select,
} from "@/components/ui";
import { Tabs } from "@/components/Tabs";
import { Modal } from "@/components/Modal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/components/Toast";
import { useAkademik } from "@/lib/akademik/store";
import { useSiakad } from "@/lib/siakad/store";
import { teacherPool } from "@/lib/akademik/seed";
import { GradeForm } from "@/components/akademik/GradeForm";
import { ClassForm } from "@/components/akademik/ClassForm";
import { SubjectForm, categoryLabels } from "@/components/akademik/SubjectForm";
import { TeacherSubjectForm } from "@/components/akademik/TeacherSubjectForm";
import { ScheduleForm, dayLabels } from "@/components/akademik/ScheduleForm";
import { RosterModal } from "@/components/akademik/RosterModal";
import type { Grade, ClassRoom, Subject, TeacherSubject, Schedule } from "@/lib/akademik/types";

function teacherName(id: string) {
  return teacherPool.find((t) => t.id === id)?.fullName ?? "—";
}

export default function AkademikPage() {
  const [tab, setTab] = useState("kelas");
  const { classes, grades, subjects, teacherSubjects, schedules, resetDemoData } = useAkademik();
  const { show } = useToast();
  const [resetOpen, setResetOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Akademik"
        title="Kelas & Jadwal Pelajaran"
        description="Kelola rombongan belajar, mata pelajaran, penugasan guru, dan jadwal mengajar — lengkap dengan pengaturan anggota kelas."
        action={
          <button
            onClick={() => setResetOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-forest-100 bg-white px-3.5 py-2 text-sm font-medium text-ink/60 shadow-soft hover:bg-forest-50"
          >
            <RotateCcw size={15} /> Reset Demo
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Rombel" value={String(classes.length)} icon={LayoutGrid} />
        <StatCard label="Tingkatan" value={String(grades.length)} icon={School} accent="gold" />
        <StatCard label="Mata Pelajaran" value={String(subjects.length)} icon={BookOpen} />
        <StatCard label="Jadwal Aktif" value={String(schedules.length)} icon={CalendarClock} accent="gold" />
      </div>

      <Card>
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { key: "kelas", label: "Kelas", count: classes.length },
            { key: "tingkatan", label: "Tingkatan", count: grades.length },
            { key: "mapel", label: "Mata Pelajaran", count: subjects.length },
            { key: "penugasan", label: "Penugasan Guru", count: teacherSubjects.length },
            { key: "jadwal", label: "Jadwal Pelajaran", count: schedules.length },
          ]}
        />
        <div className="p-5">
          {tab === "kelas" && <KelasTab />}
          {tab === "tingkatan" && <TingkatanTab />}
          {tab === "mapel" && <MapelTab />}
          {tab === "penugasan" && <PenugasanTab />}
          {tab === "jadwal" && <JadwalTab />}
        </div>
      </Card>

      <ConfirmDialog
        open={resetOpen}
        title="Reset ke data demo awal?"
        description="Seluruh perubahan pada modul Kelas & Jadwal (kelas, mapel, penugasan guru, jadwal) akan dikembalikan ke data contoh awal."
        confirmLabel="Reset"
        danger={false}
        onConfirm={() => { resetDemoData(); setResetOpen(false); show("Data Akademik dikembalikan ke data demo awal.", "info"); }}
        onCancel={() => setResetOpen(false)}
      />
    </div>
  );
}

// ---------------------------------------------------------------
// Kelas tab
// ---------------------------------------------------------------

function KelasTab() {
  const { classes, grades, addClass, updateClass, deleteClass } = useAkademik();
  const { students } = useSiakad();
  const { show } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ClassRoom | null>(null);
  const [deleting, setDeleting] = useState<ClassRoom | null>(null);
  const [rosterClass, setRosterClass] = useState<string | null>(null);

  function gradeName(id: string) {
    return grades.find((g) => g.id === id)?.name ?? "—";
  }

  function studentCount(className: string) {
    return students.filter((s) => s.className === className && s.status === "active").length;
  }

  function handleSubmit(values: Omit<ClassRoom, "id" | "createdAt" | "updatedAt">) {
    if (editing) {
      updateClass(editing.id, values);
      show(`Kelas ${values.name} berhasil diperbarui.`, "success");
    } else {
      addClass(values);
      show(`Kelas ${values.name} berhasil ditambahkan.`, "success");
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
          <Plus size={14} /> Tambah Kelas
        </button>
      </div>

      {classes.length === 0 ? (
        <EmptyState title="Belum ada kelas" description="Tambahkan rombongan belajar pertama." />
      ) : (
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Kelas</Th>
              <Th>Tingkatan</Th>
              <Th>Wali Kelas</Th>
              <Th>Tahun Ajaran</Th>
              <Th>Okupansi</Th>
              <Th className="text-right">Aksi</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {classes.map((c) => {
              const count = studentCount(c.name);
              return (
                <tr key={c.id} className="hover:bg-forest-50/40">
                  <Td className="font-medium text-ink">{c.name}</Td>
                  <Td>{gradeName(c.gradeId)}</Td>
                  <Td>{teacherName(c.homeroomTeacherId)}</Td>
                  <Td>{c.academicYear}</Td>
                  <Td className="w-48">
                    <div className="flex items-center gap-2">
                      <div className="w-24"><ProgressBar value={(count / c.capacity) * 100} /></div>
                      <span className="font-mono text-xs">{count}/{c.capacity}</span>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => setRosterClass(c.name)}
                        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-forest-700 hover:bg-forest-50"
                        title="Kelola anggota kelas"
                      >
                        <Users size={14} /> Anggota
                      </button>
                      <button onClick={() => { setEditing(c); setFormOpen(true); }} className="rounded-md p-1.5 text-ink/50 hover:bg-forest-50 hover:text-forest-700">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleting(c)} className="rounded-md p-1.5 text-ink/50 hover:bg-red-50 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </TableShell>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Kelas" : "Tambah Kelas"}>
        <ClassForm initial={editing ?? undefined} grades={grades} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Hapus kelas ${deleting?.name ?? ""}?`}
        description="Penugasan guru terkait kelas ini juga akan dihapus. Santri yang sudah ditempatkan di kelas ini tidak akan otomatis dipindahkan."
        onConfirm={() => { if (deleting) { deleteClass(deleting.id); show(`Kelas ${deleting.name} dihapus.`, "info"); } setDeleting(null); }}
        onCancel={() => setDeleting(null)}
      />

      {rosterClass && <RosterModal open={!!rosterClass} onClose={() => setRosterClass(null)} className={rosterClass} />}
    </div>
  );
}

// ---------------------------------------------------------------
// Tingkatan tab
// ---------------------------------------------------------------

function TingkatanTab() {
  const { grades, addGrade, updateGrade, deleteGrade } = useAkademik();
  const { show } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Grade | null>(null);
  const [deleting, setDeleting] = useState<Grade | null>(null);

  const sorted = useMemo(() => [...grades].sort((a, b) => a.level - b.level), [grades]);

  function handleSubmit(values: Omit<Grade, "id" | "createdAt" | "updatedAt">) {
    if (editing) {
      updateGrade(editing.id, values);
      show(`Tingkatan ${values.name} diperbarui.`, "success");
    } else {
      addGrade(values);
      show(`Tingkatan ${values.name} ditambahkan.`, "success");
    }
    setFormOpen(false);
    setEditing(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => { setEditing(null); setFormOpen(true); }} className="flex items-center gap-1.5 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-forest-800">
          <Plus size={14} /> Tambah Tingkatan
        </button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState title="Belum ada tingkatan" />
      ) : (
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Nama Tingkatan</Th>
              <Th>Level Urutan</Th>
              <Th className="text-right">Aksi</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {sorted.map((g) => (
              <tr key={g.id} className="hover:bg-forest-50/40">
                <Td className="font-medium text-ink">{g.name}</Td>
                <Td className="font-mono">{g.level}</Td>
                <Td>
                  <div className="flex justify-end gap-1">
                    <button onClick={() => { setEditing(g); setFormOpen(true); }} className="rounded-md p-1.5 text-ink/50 hover:bg-forest-50 hover:text-forest-700">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleting(g)} className="rounded-md p-1.5 text-ink/50 hover:bg-red-50 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Tingkatan" : "Tambah Tingkatan"} width="sm">
        <GradeForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Hapus tingkatan ${deleting?.name ?? ""}?`}
        onConfirm={() => { if (deleting) { deleteGrade(deleting.id); show("Tingkatan dihapus.", "info"); } setDeleting(null); }}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

// ---------------------------------------------------------------
// Mata Pelajaran tab
// ---------------------------------------------------------------

function MapelTab() {
  const { subjects, addSubject, updateSubject, deleteSubject } = useAkademik();
  const { show } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Subject | null>(null);
  const [deleting, setDeleting] = useState<Subject | null>(null);

  function handleSubmit(values: Omit<Subject, "id" | "createdAt" | "updatedAt">) {
    if (editing) {
      updateSubject(editing.id, values);
      show(`Mata pelajaran ${values.name} diperbarui.`, "success");
    } else {
      addSubject(values);
      show(`Mata pelajaran ${values.name} ditambahkan.`, "success");
    }
    setFormOpen(false);
    setEditing(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => { setEditing(null); setFormOpen(true); }} className="flex items-center gap-1.5 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-forest-800">
          <Plus size={14} /> Tambah Mapel
        </button>
      </div>

      {subjects.length === 0 ? (
        <EmptyState title="Belum ada mata pelajaran" />
      ) : (
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Kode</Th>
              <Th>Nama Mata Pelajaran</Th>
              <Th>Kategori</Th>
              <Th>Jam/Minggu</Th>
              <Th className="text-right">Aksi</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {subjects.map((s) => (
              <tr key={s.id} className="hover:bg-forest-50/40">
                <Td className="font-mono text-xs">{s.code}</Td>
                <Td className="font-medium text-ink">{s.name}</Td>
                <Td>{categoryLabels[s.category]}</Td>
                <Td>{s.creditHours}</Td>
                <Td>
                  <div className="flex justify-end gap-1">
                    <button onClick={() => { setEditing(s); setFormOpen(true); }} className="rounded-md p-1.5 text-ink/50 hover:bg-forest-50 hover:text-forest-700">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleting(s)} className="rounded-md p-1.5 text-ink/50 hover:bg-red-50 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran"}>
        <SubjectForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Hapus mata pelajaran ${deleting?.name ?? ""}?`}
        description="Penugasan guru dan jadwal yang menggunakan mapel ini juga akan terhapus."
        onConfirm={() => { if (deleting) { deleteSubject(deleting.id); show("Mata pelajaran dihapus.", "info"); } setDeleting(null); }}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

// ---------------------------------------------------------------
// Penugasan Guru tab
// ---------------------------------------------------------------

function PenugasanTab() {
  const { teacherSubjects, subjects, classes, addTeacherSubject, deleteTeacherSubject } = useAkademik();
  const { show } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<TeacherSubject | null>(null);
  const [classFilter, setClassFilter] = useState("");

  function subjectName(id: string) {
    return subjects.find((s) => s.id === id)?.name ?? "—";
  }
  function className(id: string) {
    return classes.find((c) => c.id === id)?.name ?? "—";
  }

  const filtered = classFilter ? teacherSubjects.filter((ts) => ts.classId === classFilter) : teacherSubjects;

  function handleSubmit(values: Omit<TeacherSubject, "id" | "createdAt">) {
    addTeacherSubject(values);
    show("Penugasan guru berhasil ditambahkan.", "success");
    setFormOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="sm:w-52">
          <option value="">Semua Kelas</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Select>
        <button onClick={() => setFormOpen(true)} className="flex items-center gap-1.5 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-forest-800">
          <Plus size={14} /> Tambah Penugasan
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Belum ada penugasan guru" description="Tetapkan guru pengampu untuk mata pelajaran di suatu kelas." />
      ) : (
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Guru</Th>
              <Th>Mata Pelajaran</Th>
              <Th>Kelas</Th>
              <Th className="text-right">Aksi</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {filtered.map((ts) => (
              <tr key={ts.id} className="hover:bg-forest-50/40">
                <Td className="flex items-center gap-2 font-medium text-ink">
                  <UserCog size={14} className="text-forest-500" /> {teacherName(ts.teacherId)}
                </Td>
                <Td>{subjectName(ts.subjectId)}</Td>
                <Td>{className(ts.classId)}</Td>
                <Td>
                  <div className="flex justify-end">
                    <button onClick={() => setDeleting(ts)} className="rounded-md p-1.5 text-ink/50 hover:bg-red-50 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title="Tambah Penugasan Guru">
        <TeacherSubjectForm subjects={subjects} classes={classes} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title="Hapus penugasan ini?"
        description="Jadwal pelajaran yang menggunakan penugasan ini juga akan terhapus."
        onConfirm={() => { if (deleting) { deleteTeacherSubject(deleting.id); show("Penugasan dihapus.", "info"); } setDeleting(null); }}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

// ---------------------------------------------------------------
// Jadwal Pelajaran tab
// ---------------------------------------------------------------

function JadwalTab() {
  const { schedules, teacherSubjects, subjects, classes, addSchedule, updateSchedule, deleteSchedule } = useAkademik();
  const { show } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Schedule | null>(null);
  const [deleting, setDeleting] = useState<Schedule | null>(null);
  const [dayFilter, setDayFilter] = useState("");

  function tsInfo(id: string) {
    const ts = teacherSubjects.find((t) => t.id === id);
    if (!ts) return { subject: "—", className: "—", teacher: "—" };
    return {
      subject: subjects.find((s) => s.id === ts.subjectId)?.name ?? "—",
      className: classes.find((c) => c.id === ts.classId)?.name ?? "—",
      teacher: teacherName(ts.teacherId),
    };
  }

  const filtered = dayFilter ? schedules.filter((s) => s.day === dayFilter) : schedules;
  const sorted = [...filtered].sort((a, b) => a.startTime.localeCompare(b.startTime));

  function handleSubmit(values: Omit<Schedule, "id" | "createdAt">) {
    if (editing) {
      updateSchedule(editing.id, values);
      show("Jadwal diperbarui.", "success");
    } else {
      addSchedule(values);
      show("Jadwal berhasil ditambahkan.", "success");
    }
    setFormOpen(false);
    setEditing(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Select value={dayFilter} onChange={(e) => setDayFilter(e.target.value)} className="sm:w-44">
          <option value="">Semua Hari</option>
          {Object.entries(dayLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          disabled={teacherSubjects.length === 0}
          className="flex items-center gap-1.5 rounded-lg bg-forest-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-forest-800 disabled:opacity-40"
          title={teacherSubjects.length === 0 ? "Tambahkan penugasan guru terlebih dahulu" : undefined}
        >
          <Plus size={14} /> Tambah Jadwal
        </button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState title="Belum ada jadwal" description="Tambahkan jadwal berdasarkan penugasan guru yang sudah dibuat." />
      ) : (
        <TableShell>
          <thead className="bg-forest-50/60">
            <tr>
              <Th>Hari</Th>
              <Th>Jam</Th>
              <Th>Mata Pelajaran</Th>
              <Th>Kelas</Th>
              <Th>Guru</Th>
              <Th>Ruang</Th>
              <Th className="text-right">Aksi</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-50">
            {sorted.map((s) => {
              const info = tsInfo(s.teacherSubjectId);
              return (
                <tr key={s.id} className="hover:bg-forest-50/40">
                  <Td><Badge status="active" label={dayLabels[s.day]} /></Td>
                  <Td className="font-mono text-xs">{s.startTime} - {s.endTime}</Td>
                  <Td className="font-medium text-ink">{info.subject}</Td>
                  <Td>{info.className}</Td>
                  <Td>{info.teacher}</Td>
                  <Td>{s.room}</Td>
                  <Td>
                    <div className="flex justify-end gap-1">
                      <button onClick={() => { setEditing(s); setFormOpen(true); }} className="rounded-md p-1.5 text-ink/50 hover:bg-forest-50 hover:text-forest-700">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleting(s)} className="rounded-md p-1.5 text-ink/50 hover:bg-red-50 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </TableShell>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Jadwal" : "Tambah Jadwal"}>
        <ScheduleForm
          initial={editing ?? undefined}
          teacherSubjects={teacherSubjects}
          subjects={subjects}
          classes={classes}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title="Hapus jadwal ini?"
        onConfirm={() => { if (deleting) { deleteSchedule(deleting.id); show("Jadwal dihapus.", "info"); } setDeleting(null); }}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
