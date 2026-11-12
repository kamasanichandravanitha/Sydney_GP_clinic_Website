import { MapPin, Phone, Mail, Clock, Stethoscope, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg">Sydney GP Clinic</span>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Compassionate, comprehensive healthcare for the Sydney community.
              Twenty doctors. One dedicated team.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>120 George Street, Sydney NSW 2000</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <a href="tel:+61290000000" className="hover:text-white transition-colors">(02) 9000 0000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <a href="mailto:reception@sydneygpclinic.com.au" className="hover:text-white transition-colors">reception@sydneygpclinic.com.au</a>
              </li>
            </ul>
          </div>

          {/* hours */}
          <div>
            <h3 className="font-semibold text-white mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Mon – Fri: 8:00 AM – 6:00 PM</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Saturday: 9:00 AM – 2:00 PM</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Sunday: Closed</span>
              </li>
            </ul>
            <div className="mt-4 inline-block px-3 py-1.5 rounded-full bg-green-500/15 text-green-400 text-xs font-medium ring-1 ring-green-500/30">
              Telehealth available 7 days
            </div>
          </div>

          {/* quick links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['Home', 'Doctors', 'Services', 'Book Appointment'].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Sydney GP Clinic. All rights reserved.</p>
          <p>Bulk billing available for eligible patients. CRICOS provider.</p>
        </div>
      </div>
    </footer>
  );
}
