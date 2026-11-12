import { useState } from 'react';
import { Stethoscope, Menu, X, CalendarPlus } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

export default function Header({ onBookClick }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-105">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-slate-900 text-base sm:text-lg">Sydney GP Clinic</span>
              <span className="text-[11px] text-slate-500 -mt-0.5">Caring for our community</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex">
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/25"
            >
              <CalendarPlus className="w-4 h-4" />
              Book Appointment
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setOpen(false); onBookClick(); }}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white font-semibold"
            >
              <CalendarPlus className="w-4 h-4" />
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
