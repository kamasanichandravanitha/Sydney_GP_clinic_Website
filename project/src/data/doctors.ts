export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualifications: string;
  experience: number;
  languages: string[];
  availability: string;
  image: string;
}

// A curated pool of real, license-free Pexels portraits.
// Many photos are reused across the 20 entries since the pool of
// available clinic-appropriate headshots is limited; each doctor
// entry carries its own specialty and credentials.
const POOL = [
  'https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
  'https://images.pexels.com/photos/19601385/pexels-photo-19601385.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
  'https://images.pexels.com/photos/30270934/pexels-photo-30270934.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
  'https://images.pexels.com/photos/29995629/pexels-photo-29995629.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
  'https://images.pexels.com/photos/28332542/pexels-photo-28332542.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
  'https://images.pexels.com/photos/30269649/pexels-photo-30269649.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
  'https://images.pexels.com/photos/30269648/pexels-photo-30269648.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
  'https://images.pexels.com/photos/16160861/pexels-photo-16160861.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
  'https://images.pexels.com/photos/35490803/pexels-photo-35490803.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
  'https://images.pexels.com/photos/7717254/pexels-photo-7717254.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
  'https://images.pexels.com/photos/28442318/pexels-photo-28442318.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
  'https://images.pexels.com/photos/29453541/pexels-photo-29453541.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop',
];

const pick = (id: number) => POOL[(id - 1) % POOL.length];

export const doctors: Doctor[] = [
  { id: 1,  name: 'Dr. Emily Carter',      specialty: 'General Practice',         qualifications: 'MBBS, FRACGP',                experience: 15, languages: ['English', 'French'],      availability: 'Mon – Fri', image: pick(1) },
  { id: 2,  name: 'Dr. James Wilson',      specialty: 'Cardiology',               qualifications: 'MBBS, PhD, FRACP',           experience: 22, languages: ['English'],                availability: 'Tue – Sat', image: pick(2) },
  { id: 3,  name: 'Dr. Sophia Nguyen',     specialty: 'Pediatrics',               qualifications: 'MBBS, FRACP',                experience: 12, languages: ['English', 'Vietnamese'],  availability: 'Mon – Thu', image: pick(3) },
  { id: 4,  name: 'Dr. Liam O\'Connor',    specialty: 'Dermatology',              qualifications: 'MBBS, FACD',                 experience: 18, languages: ['English', 'Irish'],       availability: 'Wed – Sat', image: pick(4) },
  { id: 5,  name: 'Dr. Olivia Bennett',    specialty: 'Women\'s Health',          qualifications: 'MBBS, FRANZCOG',             experience: 14, languages: ['English'],                availability: 'Mon – Fri', image: pick(5) },
  { id: 6,  name: 'Dr. Noah Patel',        specialty: 'Mental Health',            qualifications: 'MBBS, FRANZCP',              experience: 20, languages: ['English', 'Hindi', 'Gujarati'], availability: 'Tue – Sat', image: pick(6) },
  { id: 7,  name: 'Dr. Ava Thompson',      specialty: 'General Practice',         qualifications: 'MBBS, FRACGP',               experience: 9,  languages: ['English'],                availability: 'Mon – Fri', image: pick(7) },
  { id: 8,  name: 'Dr. Ethan Murphy',      specialty: 'Respiratory Medicine',     qualifications: 'MBBS, FRACP',                experience: 16, languages: ['English'],                availability: 'Thu – Sun', image: pick(8) },
  { id: 9,  name: 'Dr. Isabella Rossi',    specialty: 'Endocrinology',            qualifications: 'MBBS, FRACP',                experience: 11, languages: ['English', 'Italian'],     availability: 'Mon – Fri', image: pick(9) },
  { id: 10, name: 'Dr. William Chen',      specialty: 'General Practice',         qualifications: 'MBBS, FRACGP',               experience: 13, languages: ['English', 'Mandarin'],    availability: 'Tue – Sat', image: pick(10) },
  { id: 11, name: 'Dr. Mia Kowalski',      specialty: 'Geriatric Medicine',       qualifications: 'MBBS, FRACP',                experience: 19, languages: ['English', 'Polish'],      availability: 'Mon – Thu', image: pick(11) },
  { id: 12, name: 'Dr. Benjamin Lee',      specialty: 'Sports Medicine',          qualifications: 'MBBS, FACSP',                experience: 10, languages: ['English', 'Korean'],      availability: 'Wed – Sat', image: pick(12) },
  { id: 13, name: 'Dr. Charlotte Davies',  specialty: 'General Practice',         qualifications: 'MBBS, FRACGP',               experience: 8,  languages: ['English', 'Welsh'],       availability: 'Mon – Fri', image: pick(1) },
  { id: 14, name: 'Dr. Henry Walker',      specialty: 'Gastroenterology',         qualifications: 'MBBS, FRACP',                experience: 21, languages: ['English'],                availability: 'Tue – Sat', image: pick(2) },
  { id: 15, name: 'Dr. Amelia Singh',      specialty: 'Pediatrics',               qualifications: 'MBBS, FRACP',                experience: 7,  languages: ['English', 'Punjabi', 'Hindi'], availability: 'Mon – Fri', image: pick(3) },
  { id: 16, name: 'Dr. Alexander Wright',  specialty: 'Neurology',                qualifications: 'MBBS, FRACP',                experience: 24, languages: ['English'],                availability: 'Thu – Sun', image: pick(4) },
  { id: 17, name: 'Dr. Grace Kim',         specialty: 'General Practice',         qualifications: 'MBBS, FRACGP',               experience: 6,  languages: ['English', 'Korean'],      availability: 'Mon – Fri', image: pick(5) },
  { id: 18, name: 'Dr. Sebastian Hoffmann',specialty: 'Rheumatology',             qualifications: 'MBBS, FRACP',                experience: 17, languages: ['English', 'German'],      availability: 'Tue – Sat', image: pick(6) },
  { id: 19, name: 'Dr. Chloe Martin',      specialty: 'Travel Medicine',          qualifications: 'MBBS, FRACGP, ISTM',         experience: 12, languages: ['English', 'Spanish'],     availability: 'Mon – Thu', image: pick(7) },
  { id: 20, name: 'Dr. Daniel Foster',     specialty: 'General Practice',         qualifications: 'MBBS, FRACGP',               experience: 15, languages: ['English'],                availability: 'Wed – Sun', image: pick(8) },
];
