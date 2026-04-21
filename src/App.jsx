// src/App.jsx
import Nav from './components/Nav'
import NavSP from './components/sp/NavSP'

import Hero from './sections/Hero'
import ConceptSection from './sections/ConceptSection'
import TreatmentSection from './sections/TreatmentSection'
import AtmosphereSection from './sections/AtmosphereSection'
import FlowSection from './sections/FlowSection'
import AccessSection from './sections/AccessSection'
import ReserveSection from './sections/ReserveSection'
import NoticeSection from './sections/NoticeSection'
import Footer from './sections/Footer'

import {
  HeroSP,
  ConceptSectionSP,
  TreatmentSectionSP,
  AtmosphereSectionSP,
  FlowSectionSP,
  AccessSectionSP,
  ReserveSectionSP,
  NoticeSectionSP,
  FooterSP,
} from './sections/sp'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F5F0] text-[#252118] antialiased">
      {/* =========================
          NAV (PC / SP DOM 分離)
         ========================= */}
      <div className="hidden md:block">
        <Nav />
      </div>
      <div className="md:hidden">
        <NavSP />
      </div>

      <main>
        {/* =========================
            PC DOM
           ========================= */}
        <div className="hidden md:block">
          <Hero />
          <ConceptSection />
          <TreatmentSection />
          <AtmosphereSection />
          <FlowSection />
          <AccessSection />
          <ReserveSection />
          <NoticeSection />
        </div>

        {/* =========================
            SP DOM
           ========================= */}
        <div className="md:hidden">
          <HeroSP />
          <ConceptSectionSP />
          <TreatmentSectionSP />
          <AtmosphereSectionSP />
          <FlowSectionSP />
          <AccessSectionSP />
          <ReserveSectionSP />
          <NoticeSectionSP />
        </div>
      </main>

      {/* =========================
          FOOTER (PC / SP DOM 分離)
         ========================= */}
      <div className="hidden md:block">
        <Footer />
      </div>
      <div className="md:hidden">
        <FooterSP />
      </div>
    </div>
  )
}

export default App