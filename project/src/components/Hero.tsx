import { CalendarPlus, Phone, Clock, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600">
      {/* decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium tracking-wide ring-1 ring-white/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Trusted by 30,000+ Sydneysiders
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Your health, in expert hands.
            </h1>
            <p className="mt-5 text-lg text-blue-100 max-w-xl leading-relaxed">
              Sydney GP Clinic brings together 20 experienced general practitioners
              and specialists under one roof. Same-day appointments, bulk billing
              available, and compassionate care for every family.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-blue-700 font-semibold shadow-lg shadow-blue-900/20 hover:bg-blue-50 transition-all hover:scale-[1.02]"
              >
                <CalendarPlus className="w-5 h-5" />
                Book an Appointment
              </button>
              <a
                href="tel:+61290000000"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-500/30 ring-1 ring-white/30 text-white font-semibold hover:bg-blue-500/40 transition-colors"
              >
                <Phone className="w-5 h-5" />
                (02) 9000 0000
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <p className="text-3xl font-bold text-white">20+</p>
                <p className="text-xs text-blue-200 mt-1">Doctors</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">15k+</p>
                <p className="text-xs text-blue-200 mt-1">Patients/yr</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">7</p>
                <p className="text-xs text-blue-200 mt-1">Days open</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-[2rem] rotate-3" />
              <img
                src="https://images.pexels.com/photos/7108324/pexels-photo-7108324.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Modern clinic reception"
                className="relative rounded-[2rem] shadow-2xl ring-1 ring-white/20 object-cover w-full h-[480px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Open Today</p>
                  <p className="text-xs text-slate-500">8:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
