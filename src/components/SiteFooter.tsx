const COLUMNS = [
  {
    title: 'Студентам',
    links: [
      ['Вакансии', 'vacancies'],
      ['Стажировки', 'internships'],
      ['Конструктор резюме', 'resume'],
      ['Карьерный трек', 'career-track'],
      ['Целевое обучение', 'target-education'],
    ],
  },
  {
    title: 'Академии',
    links: [
      ['Право', 'academies'],
      ['Экономика и управление', 'academies'],
      ['Туризм и гостеприимство', 'academies'],
      ['Фармация', 'academies'],
      ['Информационные технологии', 'academies'],
    ],
  },
  {
    title: 'Университет',
    links: [
      ['Основной сайт', 'about'],
      ['Аналитика выпуска', 'analytics'],
      ['Новости центра', 'news'],
      ['О центре', 'about'],
    ],
  },
  {
    title: 'Работодателям',
    links: [
      ['Разместить вакансию', 'callback'],
      ['Договор о практике', 'target-education'],
      ['Целевое обучение', 'target-education'],
    ],
  },
]

export function SiteFooter({ onCallback }: { onCallback: () => void }) {
  const year = new Date().getFullYear()

  const go = (id: string) => {
    if (id === 'callback') {
      onCallback()
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="mt-20 bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-amber">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map(([label, id]) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => go(id)}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-6">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/80">
            <span className="font-semibold text-white">Центр карьеры Южного университета (ИУБиП)</span>
            <span>344068, г. Ростов-на-Дону, пр. Михаила Нагибина, 33А/47</span>
            <span>
              <a className="transition-colors hover:text-white" href="mailto:career@iubip.ru">
                career@iubip.ru
              </a>
            </span>
          </div>
          <p className="mt-2 text-sm text-white/70">Горячая линия: 8 800 77-55-012 · пн–пт 9:00–18:00</p>
          <p className="mt-6 text-xs text-white/50">
            © {year} Южный университет (ИУБиП). При использовании материалов ссылка на сайт
            обязательна.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter