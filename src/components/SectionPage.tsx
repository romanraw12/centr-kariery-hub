import type { ReactNode } from 'react'
import { NAV } from '../nav'

/* Обложка раздела: крошки, заголовок и подзаголовок — где начинается раздел.
   Иллюстрации живут в каталоге на главной, навигация — в меню-шестерёнке. */
export function SectionPage({ id, children }: { id: string; children: ReactNode }) {
  const current = NAV.find((item) => item.id === id)

  if (!current) return null

  return (
    <div>
      {/* Обложка: явная граница начала раздела. */}
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <div className="panel relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-azure-soft via-card to-card" />
          <div className="relative p-6 sm:p-8">
            <p className="caption uppercase tracking-[0.16em]">Центр карьеры · раздел</p>
            <h1 className="mt-1.5 font-display text-3xl leading-tight sm:text-4xl">
              {current.label}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">{current.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Содержимое раздела. */}
      {children}
    </div>
  )
}

export default SectionPage