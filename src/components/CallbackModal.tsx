import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, X } from 'lucide-react'

const TOPICS = ['Консультация по карьере', 'Практика и стажировка', 'Целевое обучение', 'Работодателю'] as const

/* Заявка на звонок. Бэкенда нет — форма собирает данные и показывает
   подтверждение; отправку можно подключить к почте или CRM позже. */
export function CallbackModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState<string>(TOPICS[0])
  const [agree, setAgree] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  if (!open) return null

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (name.trim().length < 2) {
      setError('Как к вам обращаться?')
      return
    }
    if (phone.trim().length < 6) {
      setError('Укажите телефон для звонка')
      return
    }
    if (!agree) {
      setError('Нужно согласие на обработку персональных данных')
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy-deep/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Заказать звонок"
      onClick={onClose}
    >
      <div
        className="panel relative w-full max-w-lg rounded-t-lg bg-card p-6 shadow-xl sm:rounded"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 rounded-sm p-1 text-ink-soft transition-colors hover:bg-azure-soft hover:text-azure"
        >
          <X className="h-5 w-5" />
        </button>

        {sent ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-amber" />
            <h2 className="mt-4 text-2xl">Заявка принята</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Перезвоним в рабочее время (пн–пт 9:00–18:00) по теме «{topic}».
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 bg-azure px-6 py-2.5 text-sm font-semibold text-card transition-colors hover:bg-azure-deep"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <p className="caption uppercase tracking-[0.14em]">Центр карьеры</p>
            <h2 className="mt-1 text-2xl">Заказать звонок</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Оставьте контакты — куратор академии перезвонит и подскажет, с чего начать.
            </p>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="caption">Ваше имя</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1 w-full border border-line bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-azure"
                  placeholder="Анна"
                />
              </label>

              <label className="block">
                <span className="caption">Телефон</span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  inputMode="tel"
                  className="mt-1 w-full border border-line bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-azure"
                  placeholder="+7 900 000-00-00"
                />
              </label>

              <label className="block">
                <span className="caption">Тема звонка</span>
                <select
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  className="mt-1 w-full border border-line bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-azure"
                >
                  {TOPICS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-start gap-2 text-xs text-ink-soft">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(event) => setAgree(event.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-azure"
                />
                <span>
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                </span>
              </label>
            </div>

            {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              className="mt-6 w-full bg-azure px-6 py-3 text-sm font-semibold text-card transition-colors hover:bg-azure-deep"
            >
              Жду звонка
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default CallbackModal