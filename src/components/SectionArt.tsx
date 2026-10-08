/* Иллюстрации разделов: простые плоские SVG в палитре сайта. Каждая картинка
   лежит на светлой скруглённой плашке — читается и в светлой, и в тёмной теме. */

const NAVY = '#0c5f97'
const AZURE = '#097aae'
const SOFT = '#e9f4fc'
const AMBER = '#dfa92f'
const WHITE = '#ffffff'

export function SectionArt({ kind, className }: { kind: string; className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true">
      <rect x="4" y="4" width="152" height="112" rx="20" fill={SOFT} />

      {kind === 'vacancies' && (
        <>
          <path d="M64 46v-6a10 10 0 0 1 10-10h12a10 10 0 0 1 10 10v6" stroke={NAVY} strokeWidth="6" />
          <rect x="42" y="46" width="76" height="48" rx="12" fill={NAVY} />
          <rect x="42" y="62" width="76" height="7" fill={AZURE} />
          <rect x="73" y="59" width="14" height="16" rx="4" fill={AMBER} />
        </>
      )}

      {kind === 'internships' && (
        <>
          <path d="M80 24c11 9 17 22 17 36v16H63V60c0-14 6-27 17-36z" fill={WHITE} stroke={NAVY} strokeWidth="5" />
          <circle cx="80" cy="56" r="9" fill={AZURE} />
          <path d="M63 62 50 84h13z" fill={AMBER} />
          <path d="M97 62l13 22H97z" fill={AMBER} />
          <path d="M74 80c1 7 3 11 6 16 3-5 5-9 6-16z" fill={AMBER} />
        </>
      )}

      {kind === 'resume' && (
        <>
          <rect x="52" y="24" width="56" height="74" rx="9" fill={WHITE} stroke={NAVY} strokeWidth="5" />
          <rect x="62" y="40" width="36" height="7" rx="3.5" fill={AZURE} />
          <rect x="62" y="54" width="36" height="7" rx="3.5" fill={AZURE} />
          <rect x="62" y="68" width="24" height="7" rx="3.5" fill={AZURE} />
          <path d="M66 86l8 8 16-16" stroke={AMBER} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {kind === 'ambassadors' && (
        <>
          <circle cx="62" cy="54" r="13" fill={AZURE} />
          <path d="M40 94a22 22 0 0 1 44 0z" fill={AZURE} />
          <circle cx="100" cy="50" r="15" fill={NAVY} />
          <path d="M76 94a24 24 0 0 1 48 0z" fill={NAVY} />
          <circle cx="126" cy="32" r="9" fill={AMBER} />
        </>
      )}

      {kind === 'academies' && (
        <>
          <path d="M80 22 34 48h92z" fill={NAVY} />
          <rect x="42" y="48" width="76" height="46" rx="6" fill={WHITE} stroke={NAVY} strokeWidth="4" />
          <rect x="54" y="56" width="9" height="30" rx="4" fill={AZURE} />
          <rect x="75" y="56" width="9" height="30" rx="4" fill={AZURE} />
          <rect x="96" y="56" width="9" height="30" rx="4" fill={AZURE} />
          <rect x="36" y="94" width="88" height="9" rx="4.5" fill={AMBER} />
          <path d="M80 22V10" stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
          <path d="M80 10h12l-4 5 4 5H80z" fill={AMBER} />
        </>
      )}

      {kind === 'career-track' && (
        <>
          <rect x="34" y="82" width="24" height="20" rx="7" fill={AZURE} />
          <rect x="60" y="66" width="24" height="36" rx="7" fill={AZURE} />
          <rect x="86" y="50" width="24" height="52" rx="7" fill={NAVY} />
          <path d="M44 62l16-14 14 10 24-22" stroke={AMBER} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="98" cy="36" r="6" fill={AMBER} />
        </>
      )}

      {kind === 'target-education' && (
        <>
          <circle cx="76" cy="62" r="32" fill={WHITE} stroke={NAVY} strokeWidth="5" />
          <circle cx="76" cy="62" r="19" fill={AZURE} />
          <circle cx="76" cy="62" r="7" fill={AMBER} />
          <path d="M76 62 112 28" stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
          <path d="M112 28l-8-14 20 4z" fill={AMBER} />
        </>
      )}

      {kind === 'analytics' && (
        <>
          <path d="M38 30v60h86" stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
          <rect x="54" y="64" width="16" height="26" rx="5" fill={AZURE} />
          <rect x="78" y="50" width="16" height="40" rx="5" fill={AZURE} />
          <rect x="102" y="38" width="16" height="52" rx="5" fill={NAVY} />
          <path d="M54 58l30-14 34-12" stroke={AMBER} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="118" cy="32" r="6" fill={AMBER} />
        </>
      )}

      {kind === 'news' && (
        <>
          <rect x="42" y="32" width="76" height="56" rx="9" fill={WHITE} stroke={NAVY} strokeWidth="5" />
          <rect x="52" y="43" width="30" height="8" rx="4" fill={AMBER} />
          <rect x="52" y="58" width="56" height="6" rx="3" fill={AZURE} />
          <rect x="52" y="70" width="44" height="6" rx="3" fill={AZURE} />
          <circle cx="130" cy="84" r="8" fill={AMBER} />
        </>
      )}

      {kind === 'contacts' && (
        <>
          <path d="M76 24a24 24 0 0 1 24 24c0 17-24 40-24 40S52 65 52 48a24 24 0 0 1 24-24z" fill={NAVY} />
          <circle cx="76" cy="47" r="9" fill={WHITE} />
          <path d="M110 56c7 6 7 18 0 24" stroke={AMBER} strokeWidth="5" strokeLinecap="round" />
          <path d="M122 48c12 10 12 30 0 40" stroke={AMBER} strokeWidth="5" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}