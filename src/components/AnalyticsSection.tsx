import { DIRECTION_STATS, NEWS, OVERVIEW } from '../data/structure'
import { VACANCIES } from '../data/vacancies'

export function AnalyticsSection() {
  return (
    <section id="analytics" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <p className="mt-3 max-w-3xl text-sm text-ink-soft">
        Опрос выпускников 2024–2025 годов. Данные обновлены в сентябре 2026 года.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {[
          { value: `${OVERVIEW.employmentRate} %`, label: 'выпускников работают по специальности через полгода' },
          { value: OVERVIEW.medianSalary, label: 'медианная стартовая зарплата по опросу выпускников' },
          { value: String(VACANCIES.length), label: 'реальных вакансий в подборке' },
        ].map((item) => (
          <div key={item.label} className="panel p-5">
            <p className="metric text-4xl text-amber">{item.value}</p>
            <p className="mt-3 text-sm text-ink-soft">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="panel mt-4 p-5">
        <p className="caption">Трудоустройство по направлениям подготовки</p>
        <ul className="mt-4 space-y-3">
          {DIRECTION_STATS.map((item) => (
            <li key={item.direction}>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span>{item.direction}</span>
                <span className="metric text-base text-azure">{item.percent} %</span>
              </div>
              <div className="mt-1.5 h-2 bg-azure-soft">
                <div className="h-full bg-azure" style={{ width: `${item.percent}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-soft">
          Источник вакансий: открытое API «Работы России» (trudvsem.ru), подборка от{' '}
          {OVERVIEW.updated}. Опрос выпускников — внутренний, Центр карьеры.
        </p>
      </div>
    </section>
  )
}

export function NewsSection() {
  return (
    <section id="news" className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <ul className="mt-6 divide-y divide-line border-t border-line">
          {NEWS.map((item) => (
            <li key={item.date} className="flex flex-wrap gap-x-6 gap-y-1 py-4">
              <span className="caption w-24 shrink-0">{item.date}</span>
              <span className="text-sm leading-relaxed">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ContactsSection({ onCallback }: { onCallback: () => void }) {
  return (
    <section id="contacts" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="section-title">О центре</h2>
          <p className="mt-4 text-sm leading-relaxed">
            Центр карьеры — структура Южного университета (ИУБиП). Мы сопровождаем студента с
            первого курса: помогаем выбрать направление, собрать резюме, договориться о практике
            и выйти на первое рабочее место.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Вуз готовит молодых специалистов, а Центр карьеры связывает их с работодателями: у
            вакансий, стажировок и мест практики достаточно уже с 1 курса.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onCallback}
              className="bg-amber px-5 py-2.5 text-sm font-semibold text-navy-deep transition-colors hover:brightness-95"
            >
              Заказать звонок
            </button>
            <a
              href="mailto:career@iubip.ru"
              className="border border-line-strong px-5 py-2.5 text-sm font-semibold transition-colors hover:border-azure hover:text-azure"
            >
              career@iubip.ru
            </a>
          </div>
        </div>

        <div className="panel p-6">
          <p className="caption">Центр карьеры и кураторы академий</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-ink-soft">Адрес</dt>
              <dd>344068, г. Ростов-на-Дону, пр. Михаила Нагибина, 33А/47</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Горячая линия</dt>
              <dd>8 800 77-55-012 (звонок бесплатный)</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Приёмная комиссия</dt>
              <dd>8 (863) 245-45-65</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Почта</dt>
              <dd>career@iubip.ru</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Часы работы</dt>
              <dd>пн–пт 9:00–18:00</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}