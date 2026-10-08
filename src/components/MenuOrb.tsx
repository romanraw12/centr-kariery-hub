import { useEffect, useState } from 'react'
import { Circle, Settings2, X } from 'lucide-react'
import { NAV } from '../nav'
import { useTheme } from '../theme'

/* Боковое меню-кружок. В основной (голубой с золотом) теме — круглая
   кнопка с шестерёнкой; в тёмной — «капля» из белого кружка: панель белая,
   содержимое тёмное. */
export function MenuOrb() {
  const [open, setOpen] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 260)
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 md:right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2">
      {/* Панель разделов: раскрывается кругом от центра кружка. */}
      <div
        data-open={open}
        aria-hidden={!open}
        className={`menu-drop absolute right-0 bottom-0 w-[19rem] rounded-card border border-line bg-card p-3 shadow-2xl transition-[clip-path] md:top-1/2 md:bottom-auto md:-translate-y-1/2 ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="menu-item flex items-center justify-between px-3 py-2">
          <span className="caption uppercase tracking-[0.16em]">Разделы</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
            className="grid h-7 w-7 place-items-center text-ink-soft transition-colors hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="mt-1 max-h-[60vh] space-y-0.5 overflow-y-auto">
          {NAV.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                style={{ transitionDelay: `${index * 28}ms` }}
                className="menu-item flex w-full items-center justify-between rounded-control px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-azure-soft"
              >
                <span>{item.label}</span>
                <span className="text-xs text-ink-soft">→</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Кружок-кнопка. */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Закрыть меню разделов' : 'Открыть меню разделов'}
        className="orb relative"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : theme === 'dark' ? (
          <Circle className="h-5 w-5" />
        ) : (
          <Settings2 className="h-6 w-6" />
        )}
      </button>
    </div>
  )
}

export default MenuOrb