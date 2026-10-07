import { ArrowUpRight } from 'lucide-react'
import { AMBASSADORS } from '../data/ambassadors'

export function AmbassadorSection() {
  return (
    <section id="ambassadors" className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 className="section-title">Амбассадоры крупных компаний</h2>
        <p className="mt-3 max-w-3xl text-sm text-ink-soft">
          Амбассадор — студент, который представляет компанию в своём вузе: рассказывает о
          стажировках, ведёт соцсети, собирает митапы и помогает одногруппникам попасть на отбор.
          Это строка в резюме и короткий путь на стажировку.
        </p>

        <ul className="mt-7 grid gap-4 md:grid-cols-2">
          {AMBASSADORS.map((item) => (
            <li key={item.id} className="panel p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-navy font-display text-lg font-bold text-amber">
                  {item.mark}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg leading-snug">{item.company}</h3>
                  <p className="caption">{item.tagline}</p>
                </div>
                {item.deadline && (
                  <span className="ml-auto shrink-0 rounded-control border border-amber px-2.5 py-0.5 text-[11px] text-amber">
                    до {item.deadline}
                  </span>
                )}
              </div>

              <dl className="mt-4 space-y-2 text-sm">
                {[
                  ['Подойдёт', item.suits],
                  ['Делает', item.does],
                  ['Получает', item.gives],
                  ['Условия', item.terms],
                  ['Отбор', item.selection],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <dt className="w-24 shrink-0 text-xs uppercase tracking-wide text-ink-soft">
                      {label}
                    </dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 border-t border-line pt-3 text-sm font-semibold text-azure transition-colors hover:text-azure-deep"
              >
                Программа и условия
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default AmbassadorSection