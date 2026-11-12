import { doctors } from '@/data/doctors';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1MZorD_k7hY5N-t-JOz9RGW6Ry8zG9HyjbxcrdAVWg26TagjgxtvC9ahHS9SEgnnzLQ/exec';

export interface BookingPayload {
  fullName: string;
  phoneNumber: string;
  preferredDoctor: string;
  symptoms: string;
}

export function doctorNameFromId(id: number | '' | null): string {
  if (id === '' || id === null) return 'No preference';
  const doc = doctors.find((d) => d.id === id);
  return doc ? `${doc.name} — ${doc.specialty}` : 'No preference';
}

/**
 * Sends booking data to Google Sheets via a Apps Script web app.
 * Uses `no-cors` so the response is opaque; we resolve on a successful
 * fetch (no thrown error) and reject on network failure.
 */
export async function submitToGoogleSheets(payload: BookingPayload): Promise<void> {
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
