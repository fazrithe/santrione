"use client";

import { useState } from "react";
import { Sparkles, Send, Wallet, BookMarked, CalendarCheck } from "lucide-react";
import { PageHeader, Card } from "@/components/ui";
import { aiConversationSample, type AiMessage } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

const suggestions = [
  { label: "Ringkas tunggakan SPP bulan ini", icon: Wallet },
  { label: "Progres tahfidz kelas 8A minggu ini", icon: BookMarked },
  { label: "Kelas dengan kehadiran terendah", icon: CalendarCheck },
];

const demoReply =
  "Ini adalah demo antarmuka. Pada versi produksi, Asisten AI akan membaca data real-time dari seluruh modul SantriOne (akademik, keuangan, asrama, tahfidz) untuk memberi jawaban yang akurat dan bisa ditindaklanjuti langsung dari sini.";

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<AiMessage[]>(aiConversationSample);
  const [input, setInput] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text }, { role: "assistant", content: demoReply }]);
    setInput("");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Asisten AI"
        title="Tanya SantriOne AI"
        description="Asisten berbasis AI yang memahami data seluruh modul untuk membantu keputusan harian Anda."
      />

      <Card className="flex h-[560px] flex-col overflow-hidden">
        <div className="flex items-center gap-3 border-b border-forest-50 px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-700 text-gold-300">
            <Sparkles size={16} />
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-ink">SantriOne AI</p>
            <p className="text-xs text-ink/50">Terhubung ke SIAKAD, Keuangan, Tahfidz, Absensi</p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-forest-700 text-white"
                    : "border border-forest-100 bg-forest-50/60 text-ink"
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-forest-50 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s.label}
                onClick={() => send(s.label)}
                className="flex items-center gap-1.5 rounded-full border border-forest-100 bg-white px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-gold-300 hover:bg-gold-50"
              >
                <s.icon size={13} /> {s.label}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 rounded-full border border-forest-100 bg-white px-2 py-1.5 shadow-soft"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pertanyaan Anda..."
              className="flex-1 bg-transparent px-3 py-1.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-700 text-white hover:bg-forest-800"
              aria-label="Kirim"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
