import { Moon, PhoneCall, Sun } from 'lucide-react'
import { useTheme } from '../theme'
import { Logo } from './Logo'

export function SiteHeader({ onCallback }: { onCallback: () => void }) {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-40">
      {/* Служебная полоса: сведения об образовательной организации. */}
      <div className="bg-navy-deep text-white/75">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-1.5 text-xs">
          <span>Южный университет (ИУБиП)</span>
          <a
            href="https://www.iubip.ru/sveden/"
            target="_blank"
            rel="noreferrer"
            className="hidden transition-colors hover:text-white sm:inline"
          >
            Сведения об образовательной организации
          </a>
          <a
            href="https://www.minobrnauki.gov.ru/"
            target="_blank"
            rel="noreferrer"
            className="ml-auto transition-colors hover:text-white"
          >
            Минобрнауки России
          </a>
        </div>
      </div>

      {/* Шапка: крупный логотип-медальон, пояснения, телефоны-чипики,
         мягкие органы управления — без единого острого угла. */}
      <div className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3">
          {/* Бренд: логотип крупным планом в скруглённом медальоне.
              Цвет логотипа наследуется от темы: золото — в основной,
              белый — в тёмной; подложка медальона подстраивается. */}
          <div className="flex items-center gap-4">
            <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-card border border-line bg-white p-2.5 shadow-sm sm:h-24 sm:w-24 dark:border-white/15 dark:bg-navy">
              <Logo className="h-full w-full text-amber" />
            </span>

            <div>
              <p className="font-display text-[1.65rem] leading-tight sm:text-[1.85rem]">Центр карьеры</p>
              <p className="caption uppercase tracking-[0.16em]">Южный университет · ИУБиП</p>
              <p className="caption mt-0.5 hidden sm:block">Вакансии · стажировки · карьерный трек</p>
            </div>
          </div>

          {/* Пояснения и действия — в мягких «таблетках». */}
          <div className="ml-auto flex flex-wrap items-center gap-2.5">
            <div className="hidden rounded-card border border-line bg-surface px-4 py-2 transition-colors hover:border-azure/60 sm:block">
              <p className="caption">Горячая линия</p>
              <a
                href="tel:88007755012"
                className="text-sm font-semibold tracking-wide transition-colors hover:text-azure"
              >
                8 800 77-55-012
              </a>
            </div>
            <div className="hidden rounded-card border border-line bg-surface px-4 py-2 transition-colors hover:border-azure/60 md:block">
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
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-azure hover:text-azure"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onCallback}
              className="inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-navy-deep shadow-sm transition-all hover:brightness-95"
            >
              <PhoneCall className="h-4 w-4" />
              Заказать звонок
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader