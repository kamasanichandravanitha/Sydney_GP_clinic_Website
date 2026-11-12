import { useMemo, useState } from 'react';
import { Search, Clock, Globe, Award, CalendarPlus } from 'lucide-react';
import { doctors, type Doctor } from '@/data/doctors';

interface DoctorsProps {
  onBookDoctor: (doctor: Doctor) => void;
}

const specialties = ['All', ...Array.from(new Set(doctors.map((d) => d.specialty)))];

export default function Doctors({ onBookDoctor }: DoctorsProps) {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('All');

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchesQuery =
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.specialty.toLowerCase().includes(query.toLowerCase());
      const matchesSpec = specialty === 'All' || d.specialty === specialty;
      return matchesQuery && matchesSpec;
    });
  }, [query, specialty]);

  return (
    <section id="doctors" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Our Team</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">Meet Our Doctors</h2>
          <p className="mt-3 text-slate-600">
            Twenty dedicated practitioners offering general practice, specialist
            care, and everything in between.
          </p>
        </div>

        {/* search + filter */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          <div className="relative">
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full sm:w-auto appearance-none pl-4 pr-10 py-3 rounded-full border border-slate-200 bg-white text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* count */}
        <p className="mt-4 text-center text-sm text-slate-500">
          Showing {filtered.length} of {doctors.length} doctors
        </p>

        {/* grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((doc) => (
            <article
              key={doc.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={doc.image}
                  alt={doc.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-xs font-semibold text-blue-700 shadow-sm">
                  {doc.experience} yrs exp
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 text-lg leading-tight">{doc.name}</h3>
                <p className="text-sm text-blue-600 font-medium mt-0.5">{doc.specialty}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                  <Award className="w-3.5 h-3.5 text-slate-400" />
                  {doc.qualifications}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {doc.availability}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {doc.languages.join(', ')}
                </div>
                <button
                  onClick={() => onBookDoctor(doc)}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <CalendarPlus className="w-4 h-4" />
                  Book with {doc.name.replace('Dr. ', '').split(' ')[0]}
                </button>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center text-slate-500">
            <p className="text-lg">No doctors match your search.</p>
            <button
              onClick={() => { setQuery(''); setSpecialty('All'); }}
              className="mt-3 text-blue-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
