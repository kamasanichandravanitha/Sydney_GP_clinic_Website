import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Doctors from '@/components/Doctors';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import MediAIChatbot from '@/components/MediAIChatbot';
import { CalendarPlus, Phone } from 'lucide-react';
import type { Doctor } from '@/data/doctors';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const openBooking = (doctor: Doctor | null = null) => {
    setSelectedDoctor(doctor);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Header onBookClick={() => openBooking(null)} />
      <main>
        <Hero onBookClick={() => openBooking(null)} />
        <Doctors onBookDoctor={(doc) => openBooking(doc)} />
        <Services />

        {/* CTA band */}
        <section className="py-16 bg-gradient-to-r from-blue-700 to-cyan-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to see a doctor?</h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              Book online in under a minute, or call our friendly reception team.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => openBooking(null)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-blue-700 font-semibold shadow-lg hover:bg-blue-50 transition-all hover:scale-[1.02]"
              >
                <CalendarPlus className="w-5 h-5" />
                Book Appointment
              </button>
              <a
                href="tel:+61290000000"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-500/30 ring-1 ring-white/30 text-white font-semibold hover:bg-blue-500/40 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call (02) 9000 0000
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedDoctor={selectedDoctor}
      />

      <MediAIChatbot />
    </div>
  );
}
