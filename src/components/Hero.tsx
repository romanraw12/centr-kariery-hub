import { Search } from 'lucide-react'

const QUICK = ['менеджер по продажам', 'юрист', 'экономист', 'удалённо', 'hr-специалист']

export function Hero({
  query,
  onQuery,
  vacancyCount,
  internshipCount,
  academyCount,
  onOpenVacancies,
}: {
  query: string
  onQuery: (value: string) => void
  vacancyCount: number
  internshipCount: number
  academyCount: number
  onOpenVacancies: () => void
}) {
  const goToVacancies = () => onOpenVacancies()

  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:pb-20 md:pt-16">
        <p className="caption uppercase tracking-[0.18em] text-amber">
          Центр карьеры · Ростов-на-Дону
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl md:text-5xl">
          Карьера выпускника начинается здесь
        </h1>
        <p className="mt-4 max-w-2xl text-white/80">
          Живая подборка вакансий Ростовской области с портала «Работа России». Помогаем с резюме,
          практикой и первым местом работы — студентам очной, вечерней и заочной форм.
        </p>

        {/* Поисковая панель — белый лист на синем фоне. */}
        <div className="panel mt-8 max-w-3xl p-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                value={query}
                onChange={(event) => onQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') goToVacancies()
                }}
                placeholder="Должность, компания или навык"
                className="w-full bg-transparent py-3 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-ink-soft"
              />
            </div>
            <button
              type="button"
              onClick={goToVacancies}
              className="bg-azure px-6 py-3 text-sm font-semibold text-card transition-colors hover:bg-azure-deep"
            >
              Найти работу
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="caption text-white/60">Быстрый поиск:</span>
          {QUICK.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                onQuery(item)
                goToVacancies()
              }}
              className="border border-white/25 px-3 py-1 text-xs text-white/85 transition-colors hover:border-amber hover:text-amber"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Живые счётчики. */}
        <div className="mt-10 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/15 pt-6">
          <div>
            <p className="metric text-4xl text-amber">{vacancyCount}</p>
            <p className="caption mt-2 text-white/70">вакансий в подборке</p>
          </div>
          <div>
            <p className="metric text-4xl text-amber">{internshipCount}</p>
            <p className="caption mt-2 text-white/70">стажировок</p>
          </div>
          <div>
            <p className="metric text-4xl text-amber">{academyCount}</p>
            <p className="caption mt-2 text-white/70">академий и колледж</p>
          </div>
        </div>
      </div>
      <div className="h-1 bg-amber" />
    </section>
  )
}

export default Hero