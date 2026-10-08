import { CAREER_STEPS, TARGET_EDUCATION } from '../data/structure'

/* Лесенка карьерного трека: вилки зарплат растут от ступени к ступени,
   поэтому столбик в каждой карточке шире предыдущего. */
const BAR_WIDTHS = ['38%', '62%', '92%']

export function CareerTrack() {
  return (
    <section id="career-track" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <p className="mt-3 max-w-3xl text-sm text-ink-soft">
        Каждая ступень образования открывает следующий уровень дохода. Вилки ориентировочные,
        Ростов-на-Дону, 2026.
      </p>

      <ol className="mt-7 grid gap-4 md:grid-cols-3">
        {CAREER_STEPS.map((step, index) => (
          <li key={step.level} className="panel flex flex-col p-5">
            <div className="flex items-baseline gap-3">
              <span className="metric text-3xl text-amber">{index + 1}</span>
              <div>
                <p className="caption uppercase tracking-[0.14em]">{step.level}</p>
                <h3 className="text-lg leading-snug">{step.title}</h3>
              </div>
            </div>

            <p className="mt-4 font-display text-lg font-bold text-azure">{step.salary}</p>
            <div className="mt-2 h-1.5 bg-azure-soft">
              <div className="h-full bg-azure" style={{ width: BAR_WIDTHS[index] }} />
            </div>

            <p className="mt-4 text-sm text-ink-soft">{step.fields}</p>
            <p className="mt-3 text-xs">
              <span className="text-ink-soft">Должности: </span>
              {step.roles}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-5 max-w-3xl text-xs text-ink-soft">
        Реальная зарплата зависит от направления, опыта и работодателя — точные цифры подскажет
        куратор вашей академии.
      </p>
    </section>
  )
}

export function TargetEducation() {
  return (
    <section id="target-education" className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <p className="mt-3 max-w-3xl text-sm text-ink-soft">
          Работодатель-заказчик оплачивает учёбу, выпускник отрабатывает по договору.
        </p>

        <ol className="mt-7 grid gap-4 md:grid-cols-4">
          {TARGET_EDUCATION.map((step, index) => (
            <li key={step.title} className="border-t-2 border-amber pt-4">
              <span className="metric text-2xl text-amber">{index + 1}</span>
              <h3 className="mt-2 text-base leading-snug">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 max-w-3xl text-sm text-ink-soft">
          Инструкция и предложения заказчиков публикует региональный департамент образования.
          Договор заключается до начала учебного года — иначе место целевого обучения теряется.
        </p>
      </div>
    </section>
  )
}