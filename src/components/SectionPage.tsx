import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { NAV } from '../nav'
import { SectionArt } from './SectionArt'

/* Обложка раздела: хлебовые крошки, заголовок, иллюстрация и переходы
   к соседним разделам. Ниже — содержимое самой секции. */
export function SectionPage({
  id,
  onNavigate,
  children,
}: {
  id: string
  onNavigate: (id: string) => void
  children: ReactNode
}) {
  const index = NAV.findIndex((item) => item.id === id)
  const current = index >= 0 ? NAV[index] : null
  const prev = index > 0 ? NAV[index - 1] : null
  const next = index >= 0 && index < NAV.length - 1 ? NAV[index + 1] : null

  if (!current) return null

  return (
    <div>
      {/* Обложка с иллюстрацией. */}
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <div className="panel relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-azure-soft via-card to-card" />
          <div className="relative flex flex-wrap items-center gap-x-8 gap-y-5 p-6 sm:p-8">
            <div className="min-w-[14rem] flex-1">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-azure hover:text-azure"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Все разделы
              </button>

              <p className="caption mt-4 uppercase tracking-[0.16em]">Центр карьеры · раздел</p>
              <h1 className="mt-1.5 font-display text-3xl leading-tight sm:text-4xl">
                {current.label}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-ink-soft">{current.subtitle}</p>

              {/* Соседние разделы — «перелистывание». */}
              <div className="mt-5 flex flex-wrap gap-2">
                {prev && (
                  <button
                    type="button"
                    onClick={() => onNavigate(prev.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-azure hover:text-azure"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {prev.label}
                  </button>
                )}
                {next && (
                  <button
                    type="button"
                    onClick={() => onNavigate(next.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-azure hover:text-azure"
                  >
                    {next.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            <SectionArt kind={current.id} className="h-auto w-44 shrink-0 sm:w-60" />
          </div>
        </div>
      </section>

      {/* Содержимое раздела. */}
      {children}
    </div>
  )
}

export default SectionPage