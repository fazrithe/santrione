"use client";

import { useMemo, useState } from "react";
import { UserMinus, UserPlus, Search } from "lucide-react";
import { Modal } from "@/components/Modal";
import { EmptyState } from "@/components/ui";
import { useSiakad } from "@/lib/siakad/store";
import { useToast } from "@/components/Toast";

export function RosterModal({
  open,
  onClose,
  className,
}: {
  open: boolean;
  onClose: () => void;
  className: string;
}) {
  const { students, updateStudent } = useSiakad();
  const { show } = useToast();
  const [query, setQuery] = useState("");

  const members = useMemo(
    () => students.filter((s) => s.className === className && s.status === "active"),
    [students, className]
  );
  const others = useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter(
      (s) =>
        s.className !== className &&
        s.status === "active" &&
        (!q || s.fullName.toLowerCase().includes(q) || s.nis.toLowerCase().includes(q))
    );
  }, [students, className, query]);

  function moveIn(studentId: string) {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    const { id, photoInitials, createdAt, updatedAt, ...rest } = student;
    updateStudent(id, { ...rest, className });
    show(`${student.fullName} dipindahkan ke kelas ${className}.`, "success");
  }

  function moveOut(studentId: string) {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    const { id, photoInitials, createdAt, updatedAt, ...rest } = student;
    updateStudent(id, { ...rest, className: "Belum Ditempatkan" });
    show(`${student.fullName} dikeluarkan dari kelas ${className}.`, "info");
  }

  return (
    <Modal open={open} onClose={onClose} title={`Anggota Kelas ${className}`} description={`${members.length} santri aktif`} width="lg">
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50">Santri di kelas ini</p>
          {members.length === 0 ? (
            <EmptyState title="Belum ada santri di kelas ini" />
          ) : (
            <ul className="divide-y divide-forest-50 rounded-xl border border-forest-100">
              {members.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-100 text-[11px] font-semibold text-forest-700">
                      {s.photoInitials}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink">{s.fullName}</p>
                      <p className="text-xs text-ink/45">{s.nis}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => moveOut(s.id)}
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-50"
                    title="Keluarkan dari kelas"
                  >
                    <UserMinus size={13} /> Keluarkan
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50">Tambahkan santri dari kelas lain</p>
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-forest-100 bg-forest-50/40 px-3 py-2">
            <Search size={15} className="text-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama atau NIS santri..."
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
            />
          </div>
          <ul className="max-h-52 divide-y divide-forest-50 overflow-y-auto rounded-xl border border-forest-100">
            {others.slice(0, 30).map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-50 text-[11px] font-semibold text-forest-600">
                    {s.photoInitials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{s.fullName}</p>
                    <p className="text-xs text-ink/45">{s.nis} &middot; saat ini di {s.className || "Belum Ditempatkan"}</p>
                  </div>
                </div>
                <button
                  onClick={() => moveIn(s.id)}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-forest-700 hover:bg-forest-50"
                >
                  <UserPlus size={13} /> Tambahkan
                </button>
              </li>
            ))}
            {others.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-ink/40">Tidak ada santri lain yang cocok.</li>
            )}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
