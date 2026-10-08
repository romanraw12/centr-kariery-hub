import { ArrowUpRight } from 'lucide-react'
import { NAV } from '../nav'
import { SectionArt } from './SectionArt'

/* Каталог разделов на главной: каждая карточка открывает отдельную
   «страницу» раздела со своей иллюстрацией. */
export function SectionIndex({ onOpen }: { onOpen: (id: string) => void }) {
  const sections = NAV.filter((item) => item.id !== 'home')

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:py-16">
      <h2 className="section-title">Разделы центра</h2>
      <p className="mt-3 max-w-3xl text-sm text-ink-soft">
        Десять отдельных разделов — каждый со своей иллюстрацией и входом из меню-шестерёнки в
        правом нижнем углу.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpen(item.id)}
            className="panel group flex items-start gap-4 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-azure"
          >
            <SectionArt kind={item.id} className="h-auto w-20 shrink-0" />
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 font-display text-lg">
                {item.label}
                <ArrowUpRight className="h-4 w-4 text-ink-soft transition-colors group-hover:text-azure" />
              </span>
              <span className="caption mt-1 block leading-snug">{item.subtitle}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default SectionIndex