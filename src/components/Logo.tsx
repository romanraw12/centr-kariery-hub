/* Логотип «WVE» с глобусом — векторный, без внешних файлов и картинок.
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

      {/* Монограмма: W и E — курсив, V — длинное остриё вниз. */}
      <g fill="currentColor" stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
        <g transform="skewX(-11)">
          <path d="M102 48h16l19.5 105h-16z" />
          <path d="M121.5 153h16l19.5-105h-16z" />
          <path d="M141 48h16l19.5 105h-16z" />
          <path d="M160.5 153h16l19.5-105h-16z" />
          <rect x="231" y="48" width="18" height="105" />
          <rect x="231" y="48" width="58" height="18" />
          <rect x="231" y="91.5" width="50" height="18" />
          <rect x="231" y="135" width="58" height="18" />
        </g>
        <path d="M156 44h72l-36 208z" />
      </g>
    </svg>
  )
}

export default Logo