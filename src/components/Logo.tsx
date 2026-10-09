/* Логотип «ИУЕ» с глобусом — векторный, без внешних файлов и картинок.
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

      {/* Монограмма ИУЕ: курсивный наклон. У — хвост-треугольник вниз,
          у Е — палочка-продолжение вниз, вросшая в правый край треугольника,
          И сходится с У (левое плечо чаши) — все три связаны с треугольником. */}
      <g transform="skewX(-9)" fill="currentColor" stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
        {/* И: две вертикали и диагональ снизу-слева вверх-вправо */}
        <rect x="103" y="48" width="17" height="105" />
        <rect x="164" y="48" width="17" height="105" />
        <path d="M147 48h17l-27 105h-17z" />
        {/* У: чаша-«V» и длинный сужающийся хвост, уходящий за глобус */}
        <path d="M165 48h22l16 43 16-43h22l-38 102z" />
        <path d="M196 110h26l8 142z" />
        {/* Е: три перекладины; спинка продолжается вниз палочкой в треугольник */}
        <rect x="226" y="48" width="17" height="105" />
        <rect x="226" y="48" width="58" height="17" />
        <rect x="226" y="91" width="50" height="17" />
        <rect x="226" y="136" width="58" height="17" />
        <path d="M226 150h15l-14 50h-9z" />
      </g>
    </svg>
  )
}

export default Logo