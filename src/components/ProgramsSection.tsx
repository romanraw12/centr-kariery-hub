import { Briefcase, GraduationCap, MapPin } from 'lucide-react'
import { INTERNSHIPS } from '../data/internships'
import { ACADEMIES } from '../data/academies'
import { VACANCIES } from '../data/vacancies'

export function InternshipSection() {
  return (
    <section id="internships" className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <p className="mt-3 max-w-3xl text-sm text-ink-soft">
          Бесплатные программы от работодателей региона: IT, банки, производство, госслужба.
          Наборы идут волнами — точные даты уточняйте в карточке.
        </p>

        <ul className="mt-7 grid gap-4 md:grid-cols-2">
          {INTERNSHIPS.map((item) => (
            <li key={item.id} className="panel p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg leading-snug">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{item.company}</p>
                </div>
                <span
                  className={`shrink-0 rounded-control border px-2.5 py-0.5 text-[11px] ${
                    item.paid
                      ? 'border-amber text-amber'
                      : 'border-line text-ink-soft'
                  }`}
                >
                  {item.paid ? 'Оплачиваемая' : 'Без оплаты'}
                </span>
              </div>

              <p className="mt-3 text-sm">{item.summary}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.city}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  {item.period}
                </span>
                <span className="text-amber">{item.direction}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-control border border-line px-2.5 py-0.5 text-[11px] text-ink-soft">
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function AcademiesSection() {
  return (
    <section id="academies" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <p className="mt-3 max-w-3xl text-sm text-ink-soft">
        Выберите академию — покажем вакансии и места практики по вашим специальностям.
      </p>

      <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACADEMIES.map((academy) => {
          const count = VACANCIES.filter((item) => item.academy === academy.id).length
          return (
            <li key={academy.id} className="panel flex flex-col p-5">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-amber" />
                <h3 className="text-lg leading-snug">{academy.title}</h3>
              </div>
              <p className="mt-2 text-sm text-ink-soft">{academy.note}</p>
              <p className="mt-4 text-xs text-ink-soft">
                В подборке: <span className="font-display text-base font-bold text-azure">{count}</span>{' '}
                вакансий
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}