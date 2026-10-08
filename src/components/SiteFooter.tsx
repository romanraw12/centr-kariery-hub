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
      ['Основной сайт', 'https://www.iubip.ru/'],
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

export function SiteFooter({
  onCallback,
  onNavigate,
}: {
  onCallback: () => void
  onNavigate: (id: string) => void
}) {
  const year = new Date().getFullYear()

  const go = (id: string) => {
    if (id === 'callback') {
      onCallback()
      return
    }
    onNavigate(id === 'about' ? 'contacts' : id)
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
                    {id.startsWith('http') ? (
                      <a
                        href={id}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/80 transition-colors hover:text-white"
                      >
                        {label}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => go(id)}
                        className="text-sm text-white/80 transition-colors hover:text-white"
                      >
                        {label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-6">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/80">
            <span className="font-semibold text-white">Центр карьеры Южного университета (ИУБиП)</span>
            <span>
              <a
                href="https://yandex.ru/maps/?text=%D0%A0%D0%BE%D1%81%D1%82%D0%BE%D0%B2-%D0%BD%D0%B0-%D0%94%D0%BE%D0%BD%D1%83%2C%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%20%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%B0%20%D0%9D%D0%B0%D0%B3%D0%B8%D0%B1%D0%B8%D0%BD%D0%B0%2C%2033%D0%90%2F47"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                344068, г. Ростов-на-Дону, пр. Михаила Нагибина, 33А/47
              </a>
            </span>
            <span>
              <a className="transition-colors hover:text-white" href="mailto:career@iubip.ru">
                career@iubip.ru
              </a>
            </span>
          </div>
          <p className="mt-2 text-sm text-white/70">
            Горячая линия:{' '}
            <a href="tel:88007755012" className="transition-colors hover:text-white">
              8 800 77-55-012
            </a>{' '}
            · пн–пт 9:00–18:00
          </p>
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