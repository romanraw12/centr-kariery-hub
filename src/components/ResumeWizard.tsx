import { useState } from 'react'
import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import { ACADEMIES } from '../data/academies'

const FORMS = ['Очная', 'Вечерняя', 'Заочная'] as const
const GOALS = ['Первое место работы', 'Стажировка', 'Практика по специальности', 'Целевое обучение'] as const

const STEPS = ['Форма обучения', 'Академия', 'Опыт и проекты', 'Контакты', 'Готово']

interface Resume {
  form: string
  academy: string
  goal: string
  experience: string
  name: string
  phone: string
  email: string
}

const EMPTY: Resume = {
  form: FORMS[0],
  academy: ACADEMIES[0].title,
  goal: GOALS[0],
  experience: '',
  name: '',
  phone: '',
  email: '',
}

/* Выгрузка в Word: отдаём HTML-документ с расширением .doc — Word и
   «Р7-Офис» открывают его без конвертации. */
function buildDoc(data: Resume): string {
  const rows: [string, string][] = [
    ['Форма обучения', data.form],
    ['Академия', data.academy],
    ['Цель', data.goal],
    ['Опыт и проекты', data.experience || '—'],
    ['Имя', data.name || '—'],
    ['Телефон', data.phone || '—'],
    ['Почта', data.email || '—'],
  ]
  const table = rows
    .map(([key, value]) => `<tr><td width="180"><b>${key}</b></td><td>${value}</td></tr>`)
    .join('')

  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Резюме</title></head><body><h1>Резюме</h1><table border="1" cellspacing="0" cellpadding="6">${table}</table><p><i>Подготовлено в Конструкторе резюме Центра карьеры Южного университета (ИУБиП).</i></p></body></html>`
}

function download(data: Resume) {
  const blob = new Blob([`\ufeff${buildDoc(data)}`], {
    type: 'application/msword;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'rezume.doc'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function ResumeWizard() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Resume>(EMPTY)
  const isLast = step === STEPS.length - 1

  const set = <K extends keyof Resume>(key: K, value: Resume[K]) =>
    setData((prev) => ({ ...prev, [key]: value }))

  const chip = (active: boolean) =>
    `border px-3 py-1.5 text-sm transition-colors ${
      active ? 'border-azure bg-azure text-card' : 'border-line text-ink-soft hover:border-azure'
    }`

  return (
    <section id="resume" className="border-y border-line bg-card">
      <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
        <h2 className="section-title">Конструктор резюме</h2>
        <p className="mt-3 text-sm text-ink-soft">
          5 шагов · вопросы под вашу академию · выгрузка в Word
        </p>

        <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
          {STEPS.map((label, index) => (
            <li key={label} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => index <= step && setStep(index)}
                className={`flex items-center gap-2 text-xs ${
                  index <= step ? 'text-azure' : 'text-ink-soft'
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center border text-[11px] ${
                    index < step
                      ? 'border-azure bg-azure text-card'
                      : index === step
                        ? 'border-azure text-azure'
                        : 'border-line'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {index < STEPS.length - 1 && <span className="h-px w-6 bg-line" />}
            </li>
          ))}
        </ol>

        <div className="panel mt-6 p-6">
          {step === 0 && (
            <div>
              <p className="caption">Как вы учитесь?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {FORMS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => set('form', item)}
                    className={chip(data.form === item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <p className="caption">Ваша академия</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ACADEMIES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => set('academy', item.title)}
                    className={chip(data.academy === item.title)}
                  >
                    {item.short}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-sm text-ink-soft">Что важно получить в итоге?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {GOALS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => set('goal', item)}
                    className={chip(data.goal === item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <label className="block">
              <span className="caption">Опыт, проекты, курсы и навыки</span>
              <textarea
                value={data.experience}
                onChange={(event) => set('experience', event.target.value)}
                rows={6}
                placeholder="Например: практика в отеле, курс Excel, участие в студенческом совете"
                className="mt-2 w-full border border-line bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-azure"
              />
            </label>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {(
                [
                  ['name', 'Имя и фамилия'],
                  ['phone', 'Телефон'],
                  ['email', 'Почта'],
                ] as [keyof Resume, string][]
              ).map(([key, label]) => (
                <label key={key} className="block">
                  <span className="caption">{label}</span>
                  <input
                    value={data[key]}
                    onChange={(event) => set(key, event.target.value)}
                    className="mt-1 w-full border border-line bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-azure"
                  />
                </label>
              ))}
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="caption">Итог</p>
              <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-ink-soft">Форма обучения</dt>
                  <dd>{data.form}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Академия</dt>
                  <dd>{data.academy}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Цель</dt>
                  <dd>{data.goal}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">Контакт</dt>
                  <dd>{[data.name, data.phone].filter(Boolean).join(' · ') || '—'}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => download(data)}
                className="mt-5 inline-flex items-center gap-2 bg-azure px-5 py-2.5 text-sm font-semibold text-card transition-colors hover:bg-azure-deep"
              >
                <Download className="h-4 w-4" />
                Скачать резюме (Word)
              </button>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((value) => Math.max(0, value - 1))}
            className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-azure disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() => setStep((value) => Math.min(STEPS.length - 1, value + 1))}
              className="inline-flex items-center gap-1.5 border border-azure px-5 py-2.5 text-sm font-semibold text-azure transition-colors hover:bg-azure hover:text-card"
            >
              Далее
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default ResumeWizard