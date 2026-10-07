import { useEffect, useState } from 'react'
import { Moon, PhoneCall, Sun } from 'lucide-react'
import { NAV, NAV_IDS } from '../nav'
import { useTheme } from '../theme'

/* Подсветка активного пункта: секция считается активной, когда её заголовок
   оказался в верхней трети экрана. */
function useActiveSection() {
  const [active, setActive] = useState(NAV_IDS[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    NAV_IDS.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return active
}

export function SiteHeader({
  onCallback,
  counts,
}: {
  onCallback: () => void
  counts: { vacancies: number; internships: number }
}) {
  const active = useActiveSection()
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-40">
      {/* Служебная полоса: сведения об образовательной организации. */}
      <div className="bg-navy-deep text-white/75">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-1.5 text-xs">
          <span>Южный университет (ИУБиП)</span>
          <span className="hidden sm:inline">Сведения об образовательной организации</span>
          <span className="ml-auto">Минобрнауки России</span>
        </div>
      </div>

      {/* Шапка: бренд, телефоны, обратный звонок. */}
      <div className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center bg-navy font-display text-lg font-bold text-amber">
              ЮУ
            </span>
            <div>
              <p className="font-display text-xl leading-tight">Центр карьеры</p>
              <p className="caption uppercase tracking-[0.16em]">Южный университет · ИУБиП</p>
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-x-7 gap-y-3">
            <div className="hidden sm:block">
              <p className="caption">Горячая линия</p>
              <a
                href="tel:88007755012"
                className="text-sm font-semibold tracking-wide transition-colors hover:text-azure"
              >
                8 800 77-55-012
              </a>
            </div>
            <div className="hidden md:block">
              <p className="caption">Приёмная комиссия</p>
              <a
                href="tel:+78632454565"
                className="text-sm font-semibold tracking-wide transition-colors hover:text-azure"
              >
                8 (863) 245-45-65
              </a>
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
              className="grid h-10 w-10 place-items-center border border-line text-ink-soft transition-colors hover:border-azure hover:text-azure"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onCallback}
              className="inline-flex items-center gap-2 bg-amber px-4 py-2.5 text-sm font-semibold text-navy-deep transition-colors hover:brightness-95"
            >
              <PhoneCall className="h-4 w-4" />
              Заказать звонок
            </button>
          </div>
        </div>
      </div>

      {/* Липкая навигация: активный пункт — янтарная черта снизу. */}
      <nav className="border-b border-line bg-card/95 backdrop-blur" aria-label="Разделы сайта">
        <div className="no-scrollbar mx-auto flex max-w-6xl overflow-x-auto px-4">
          {NAV.map((item) => {
            const count = item.id === 'vacancies' ? counts.vacancies : item.id === 'internships' ? counts.internships : 0
            return (
              <button
                key={item.id}
                type="button"
                aria-current={active === item.id}
                onClick={() =>
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className="nav-link"
              >
                {item.label}
                {count > 0 && <span className="nav-count ml-1.5 text-amber">{count}</span>}
              </button>
            )
          })}
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader