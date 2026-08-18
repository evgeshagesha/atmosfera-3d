import { EmptyState } from "@/components/os/EmptyState";
import { SilverWaves } from "@/components/os/SilverWaves";

export default function LibraryPage() {
  return (
    <main className="relative flex min-h-full flex-col px-6 pb-8 pt-10">
      <SilverWaves />
      <div className="relative z-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Library</p>
        <h1 className="chrome-text mt-3 font-display text-[28px] uppercase">Библиотека</h1>
        <div className="mt-8">
          <EmptyState
            title="Пока пусто"
            body="Курсы и материалы появятся здесь. Сейчас это честный пустой раздел, без демо-контента."
          />
        </div>
      </div>
    </main>
  );
}
