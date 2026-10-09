/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResearchPillars } from './components/ResearchPillars';
import { WorkbenchSection } from './components/WorkbenchSection';
import { EquipmentSection } from './components/EquipmentSection';
import { PublicationsSection } from './components/PublicationsSection';
import { TeamSection } from './components/TeamSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTargetItem, setBookingTargetItem] = useState<string>('');

  const handleOpenBooking = (instrumentName?: string) => {
    if (instrumentName) {
      setBookingTargetItem(instrumentName);
    } else {
      setBookingTargetItem('');
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingTargetItem('');
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A10] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 dark:selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-200 transition-colors duration-200">
      {/* Top 3-Zone Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section with Live Oscilloscope HUD & Balanced Typography */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onScrollToWorkbench={() => scrollToSection('workbench')}
        />

        {/* Core Research Capabilities Bento Grid */}
        <ResearchPillars />

        {/* Virtual RF & Circuit Interactive Workbench Console */}
        <WorkbenchSection />

        {/* Flagship Apparatus & Cleanroom Suite */}
        <EquipmentSection
          onBookInstrument={(instrumentName) => handleOpenBooking(instrumentName)}
        />

        {/* Archival Journal & Conference Publications */}
        <PublicationsSection />

        {/* Laboratory Faculty & Research Scientists */}
        <TeamSection
          onContactLead={(leadName) => handleOpenBooking(`Collaboration with ${leadName}`)}
        />

        {/* Operating Protocols & Compliance FAQ */}
        <FaqSection />
      </main>

      {/* Institutional Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Reservation & Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedItem={bookingTargetItem}
      />
    </div>
  );
}
