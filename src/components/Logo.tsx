/* Логотип «ИУЭ» с глобусом — векторный, без внешних файлов и картинок.
   Цвет наследуется через currentColor: в шапке обёрнут в text-amber,
   поэтому в основной теме он золотой, в тёмной — белый. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 371 276" className={className} aria-hidden="true">
      {/* Глобус: контур, экватор и меридианы. */}
      <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <ellipse cx="186" cy="137" rx="155" ry="83" />
        <path d="M31 137h310" />
        <ellipse cx="186" cy="137" rx="50" ry="83" />
        <path d="M186 54a100 83 0 0 0 0 166" />
        <path d="M186 54a100 83 0 0 1 0 166" />
      </g>

      {/* Монограмма ИУЭ: курсивный наклон, У — с длинным хвостом вниз. */}
      <g transform="skewX(-9)" fill="currentColor" stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
        {/* И: две вертикали и диагональ снизу-слева вверх-вправо */}
        <rect x="103" y="48" width="17" height="105" />
        <rect x="164" y="48" width="17" height="105" />
        <path d="M147 48h17l-27 105h-17z" />
        {/* У: чаша-«V» и длинный сужающийся хвост, уходящий за глобус */}
        <path d="M165 48h22l16 43 16-43h22l-38 102z" />
        <path d="M196 110h26l8 142z" />
        {/* Э: дуга с разрезом слева и горизонтальным язычком */}
        <path
          d="M229.4 78.4a36 52.5 0 1 1 0 44.3"
          fill="none"
          strokeWidth="19"
          strokeLinecap="round"
        />
        <rect x="234" y="91" width="48" height="19" />
      </g>
    </svg>
  )
}

export default Logo