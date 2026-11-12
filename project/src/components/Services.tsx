import { HeartPulse, Stethoscope, Baby, Brain, Activity, Plane, ShieldCheck, Syringe } from 'lucide-react';

const services = [
  { icon: Stethoscope, title: 'General Practice', desc: 'Routine check-ups, prescriptions, and chronic disease management for all ages.' },
  { icon: HeartPulse, title: 'Cardiology', desc: 'Heart health assessments, ECGs, and ongoing cardiovascular care.' },
  { icon: Baby, title: 'Pediatrics', desc: 'Childhood immunisations, growth monitoring, and family care.' },
  { icon: Brain, title: 'Mental Health', desc: 'Confidential counselling, mental health plans, and ongoing support.' },
  { icon: Activity, title: 'Sports Medicine', desc: 'Injury prevention, treatment, and rehabilitation for active lifestyles.' },
  { icon: Plane, title: 'Travel Medicine', desc: 'Pre-travel vaccinations and advice tailored to your destination.' },
  { icon: Syringe, title: 'Vaccinations', desc: 'Flu shots, COVID-19 boosters, and routine immunisations.' },
  { icon: ShieldCheck, title: 'Skin Checks', desc: 'Full-body skin cancer screening and minor procedure care.' },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">What We Offer</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">Comprehensive Care Services</h2>
          <p className="mt-3 text-slate-600">
            From everyday general practice to specialist consultations — all in one convenient Sydney location.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <s.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="mt-4 font-bold text-slate-900 group-hover:text-white transition-colors">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 group-hover:text-blue-100 transition-colors leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
