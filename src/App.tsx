import { useState } from 'react'
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

/* Одностраничный портал: поиск в шапке фильтрует вакансии, обратный звонок
   открывается из шапки, подвала, карточек вакансий и блока «О центре». */
export default function App() {
  const [query, setQuery] = useState('')
  const [callbackOpen, setCallbackOpen] = useState(false)

  const openCallback = () => setCallbackOpen(true)

  return (
    <div className="min-h-screen bg-surface text-ink">
      <SiteHeader
        onCallback={openCallback}
        counts={{ vacancies: VACANCIES.length, internships: INTERNSHIPS.length }}
      />

      <main>
        <Hero
          query={query}
          onQuery={setQuery}
          vacancyCount={VACANCIES.length}
          internshipCount={INTERNSHIPS.length}
          academyCount={ACADEMIES.length}
        />

        <VacancySection query={query} onAsk={openCallback} />
        <InternshipSection />
        <ResumeWizard />
        <AmbassadorSection />
        <AcademiesSection />
        <CareerTrack />
        <TargetEducation />
        <AnalyticsSection />
        <NewsSection />
        <ContactsSection onCallback={openCallback} />
      </main>

      <SiteFooter onCallback={openCallback} />

      <MenuOrb />

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </div>
  )
}