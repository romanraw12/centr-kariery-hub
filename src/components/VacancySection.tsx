import { useMemo, useState } from 'react'
import { MapPin, Send } from 'lucide-react'
import { VACANCIES } from '../data/vacancies'
import type { Vacancy } from '../types'

type FilterKey = 'direction' | 'employment' | 'experience'

const GROUPS: { key: FilterKey; title: string }[] = [
  { key: 'direction', title: 'Направление подготовки' },
  { key: 'employment', title: 'Место работы' },
  { key: 'experience', title: 'Опыт работы' },
]

const FILTER_VALUES: Record<FilterKey, string[]> = {
  direction: [
    'Все направления',
    'Юриспруденция',
    'Экономика',
    'Менеджмент',
    'Туризм',
    'Фармация',
    'Информационные технологии',
    'Психология',
    'Управление персоналом',
    'Бухгалтерия',
    'Логистика',
  ],
  employment: ['Любое', 'Очная', 'Удалённая', 'Гибрид'],
  experience: ['Любой', 'Без опыта', '1–3 года', '3+ года'],
}

const FIRST_OF: Record<FilterKey, string> = {
  direction: FILTER_VALUES.direction[0],
  employment: FILTER_VALUES.employment[0],
  experience: FILTER_VALUES.experience[0],
}

export function VacancySection({
  query,
  onAsk,
}: {
  query: string
  onAsk: (vacancy: Vacancy) => void
}) {
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    direction: FIRST_OF.direction,
    employment: FIRST_OF.employment,
    experience: FIRST_OF.experience,
  })

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return VACANCIES.filter((item) => {
      if (filters.direction !== FIRST_OF.direction && item.direction !== filters.direction) {
        return false
      }
      if (filters.employment !== FIRST_OF.employment && item.employment !== filters.employment) {
        return false
      }
      if (filters.experience !== FIRST_OF.experience && item.experience !== filters.experience) {
        return false
      }
      if (!needle) return true
      return [item.title, item.company, item.city, item.direction, ...item.tags]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  }, [filters, query])

  return (
    <section id="vacancies" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="section-title">Вакансии</h2>
        <p className="caption">Найдено: {filtered.length} из {VACANCIES.length}</p>
      </div>
      <p className="mt-3 max-w-3xl text-sm text-ink-soft">
        Каждая вакансия проверена Центром карьеры: официальный договор, наставник, возможность
        оформить практику.
      </p>

      <div className="mt-6 grid gap-4 border-y border-line py-5 lg:grid-cols-3">
        {GROUPS.map((group) => (
          <div key={group.key}>
            <p className="caption">{group.title}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {FILTER_VALUES[group.key].map((value) => {
                const selected = filters[group.key] === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, [group.key]: value }))}
                    className={`border px-2.5 py-1 text-xs transition-colors ${
                      selected
                        ? 'border-azure bg-azure text-card'
                        : 'border-line text-ink-soft hover:border-azure hover:text-azure'
                    }`}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="panel mt-6 p-6 text-sm text-ink-soft">
          Под выбранные условия ничего не нашлось. Сбросьте фильтры или уточните запрос — куратор
          академии подскажет, где искать.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4">
          {filtered.map((item) => (
            <li key={item.id} className="panel p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg leading-snug">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{item.company}</p>
                </div>
                <p className="font-display text-lg font-bold whitespace-nowrap text-azure">
                  {item.salary}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.city}
                </span>
                <span>{item.employment}</span>
                <span>{item.experience}</span>
                <span>Опубликовано {item.posted}</span>
                <span className="text-amber">{item.direction}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-control border border-line px-2.5 py-0.5 text-[11px] text-ink-soft">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onAsk(item)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure transition-colors hover:text-azure-deep"
                >
                  <Send className="h-4 w-4" />
                  Подсказать, как откликнуться
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default VacancySection