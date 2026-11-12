/*
# Create appointments table (single-tenant, no auth)

1. New Tables
- `appointments`
  - `id` (uuid, primary key)
  - `name` (text, not null) — patient's full name
  - `phone` (text, not null) — contact phone number
  - `symptoms` (text, not null) — described symptoms / reason for visit
  - `doctor_id` (int, nullable) — optional reference to a selected doctor from the frontend directory
  - `status` (text, default 'pending') — booking status (pending/confirmed/cancelled)
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `appointments`.
- Grant INSERT + SELECT to `anon` + `authenticated` so the anon-key frontend can submit bookings and view confirmation.
- Public/shared data: allow anon + authenticated INSERT and SELECT.
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  symptoms text NOT NULL,
  doctor_id int,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON appointments TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_appointments" ON appointments;
CREATE POLICY "anon_select_appointments" ON appointments FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_appointments" ON appointments;
CREATE POLICY "anon_insert_appointments" ON appointments FOR INSERT
TO anon, authenticated WITH CHECK (true);
