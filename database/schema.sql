-- PhysioFlow Database Schema Updates
-- Run this in Supabase SQL Editor

-- Exercises table: Library of exercises doctors can assign
CREATE TABLE IF NOT EXISTS exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  duration_seconds INTEGER DEFAULT 60,
  difficulty TEXT DEFAULT 'medium',
  video_url TEXT,
  thumbnail_url TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Patient exercises: Assignments of exercises to specific patients
CREATE TABLE IF NOT EXISTS patient_exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE NOT NULL,
  assigned_by UUID REFERENCES users(id) ON DELETE SET NULL NOT NULL,
  reps_per_set INTEGER DEFAULT 10,
  sets INTEGER DEFAULT 3,
  notes TEXT,
  status TEXT DEFAULT 'active',
  assigned_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_patient_exercises_patient ON patient_exercises(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_exercises_exercise ON patient_exercises(exercise_id);
CREATE INDEX IF NOT EXISTS idx_exercises_created_by ON exercises(created_by);

-- Enable RLS
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_exercises ENABLE ROW LEVEL SECURITY;

-- Policies for exercises
CREATE POLICY "Anyone can read exercises" ON exercises FOR SELECT USING (true);
CREATE POLICY "Doctors can insert exercises" ON exercises FOR INSERT WITH CHECK (true);
CREATE POLICY "Doctors can update their exercises" ON exercises FOR UPDATE USING (true);
CREATE POLICY "Doctors can delete their exercises" ON exercises FOR DELETE USING (true);

-- Policies for patient_exercises
CREATE POLICY "Doctors can manage all assignments" ON patient_exercises FOR ALL USING (true);
CREATE POLICY "Patients can read their assignments" ON patient_exercises FOR SELECT USING (true);

-- Add injury/problem fields to users table for patients
ALTER TABLE users ADD COLUMN IF NOT EXISTS injury TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add doctor_id to link patients with their assigned doctor
ALTER TABLE users ADD COLUMN IF NOT EXISTS doctor_id UUID REFERENCES users(id);
