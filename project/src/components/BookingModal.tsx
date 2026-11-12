import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, X, CalendarPlus } from 'lucide-react';
import { doctors, type Doctor } from '@/data/doctors';
import { submitToGoogleSheets, doctorNameFromId } from '@/lib/booking';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  preselectedDoctor: Doctor | null;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function BookingModal({ open, onClose, preselectedDoctor }: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [doctorId, setDoctorId] = useState<number | ''>('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (open) {
      setDoctorId(preselectedDoctor ? preselectedDoctor.id : '');
      setStatus('idle');
      setErrorMsg('');
    }
  }, [open, preselectedDoctor]);

  // close on escape + lock scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const reset = () => {
    setName('');
    setPhone('');
    setSymptoms('');
    setDoctorId('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      await submitToGoogleSheets({
        fullName: name.trim(),
        phoneNumber: phone.trim(),
        preferredDoctor: doctorNameFromId(doctorId),
        symptoms: symptoms.trim(),
      });
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : 'Something went wrong while submitting. Please try again.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-[slideUp_0.25s_ease-out]">
        {/* header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-5 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Book an Appointment</h2>
              <p className="text-xs text-blue-100">We'll confirm within 1 business hour</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/90 hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-green-600" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">Appointment Requested!</h3>
              <p className="mt-2 text-slate-600 text-sm">
                Thank you. Your request has been received and our reception team
                will be in touch shortly to confirm your appointment.
              </p>
              <button
                onClick={onClose}
                className="mt-6 w-full px-5 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="bk-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="bk-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Smith"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="bk-phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="bk-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0412 345 678"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="bk-doctor" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Preferred Doctor
                </label>
                <select
                  id="bk-doctor"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                >
                  <option value="">No preference — first available</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="bk-symptoms" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Symptoms / Reason for Visit <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="bk-symptoms"
                  required
                  rows={4}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Briefly describe your symptoms or the reason for your visit..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending request...
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-5 h-5" />
                    Request Appointment
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-400">
                Your details are kept private and used only for booking purposes.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
