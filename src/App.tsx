import { useCallback, useEffect, useState } from 'react'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import CallbackModal from './components/CallbackModal'
import MenuOrb from './components/MenuOrb'
import Hero from './components/Hero'
import VacancySection from './components/VacancySection'
import ResumeWizard from './components/ResumeWizard'
import AmbassadorSection from './components/AmbassadorSection'
import { CareerTrack, TargetEducation } from './components/PathSections'
import { AnalyticsSection, ContactsSection, NewsSection } from './components/AnalyticsSection'
import { AcademiesSection, InternshipSection } from './components/ProgramsSection'
import { VACANCIES } from './data/vacancies'
import { INTERNSHIPS } from './data/internships'
import { ACADEMIES } from './data/academies'
import { NAV } from './nav'
import SectionIndex from './components/SectionIndex'
import SectionPage from './components/SectionPage'

/* Портал с hash-роутингом: каждый раздел — отдельная «страница»
   (#vacancies, #news…), на главной — Hero с поиском и каталог разделов.
   Обратный звонок открывается из шапки, подвала и карточек. */

const VALID_VIEWS = new Set<string>(['home', ...NAV.map((item) => item.id)])

function readHash(): string {
  const id = window.location.hash.replace(/^#/, '')
  return VALID_VIEWS.has(id) ? id : 'home'
}

export default function App() {
  const [view, setView] = useState<string>(readHash)
  const [query, setQuery] = useState('')
  const [callbackOpen, setCallbackOpen] = useState(false)

  const openCallback = () => setCallbackOpen(true)

  /* Переход между разделами: пишем хэш адреса и поднимаем страницу наверх. */
  const openView = useCallback((id: string) => {
    const target = VALID_VIEWS.has(id) ? id : 'home'
    const hash = target === 'home' ? '' : `#${target}`
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash || window.location.pathname + window.location.search)
    }
    setView(target)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  /* Кнопки «назад/вперёд» браузера возвращают на раздел. */
  useEffect(() => {
    const sync = () => setView(readHash())
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  const renderSection = () => {
    switch (view) {
      case 'vacancies':
        return <VacancySection query={query} onAsk={openCallback} />
      case 'internships':
        return <InternshipSection />
      case 'resume':
        return <ResumeWizard />
      case 'ambassadors':
        return <AmbassadorSection />
      case 'academies':
        return <AcademiesSection />
      case 'career-track':
        return <CareerTrack />
      case 'target-education':
        return <TargetEducation />
      case 'analytics':
        return <AnalyticsSection />
      case 'news':
        return <NewsSection />
      case 'contacts':
        return <ContactsSection onCallback={openCallback} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-surface text-ink">
      <SiteHeader onCallback={openCallback} />

      <main>
        {view === 'home' ? (
          <>
            <Hero
              query={query}
              onQuery={setQuery}
              vacancyCount={VACANCIES.length}
              internshipCount={INTERNSHIPS.length}
              academyCount={ACADEMIES.length}
              onOpenVacancies={() => openView('vacancies')}
            />
            <SectionIndex onOpen={openView} />
          </>
        ) : (
          <SectionPage id={view}>
            {renderSection()}
          </SectionPage>
        )}
      </main>

      <SiteFooter onCallback={openCallback} onNavigate={openView} />

      <MenuOrb current={view} onNavigate={openView} />

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </div>
  )
}