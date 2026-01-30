-- =============================================
-- PhysioFlow Database Seed Data
-- Run this in Supabase SQL Editor
-- =============================================

-- Step 1: Clear all existing data (in correct order due to foreign keys)
DELETE FROM patient_exercises;
DELETE FROM exercises;
DELETE FROM users;

-- =============================================
-- IMPORTANT: Password hashes below are for test passwords.
-- The app uses SHA-256 with salt 'rehabai_salt'
-- 
-- To generate a hash, the app does:
--   SHA256(password + 'rehabai_salt')
--
-- Test passwords used:
--   admin123, doctor123, patient123
-- =============================================

-- Step 2: Insert Admin
-- Email: admin@physioflow.com | Password: admin123
INSERT INTO users (id, email, name, role, password, phone) VALUES
('11111111-1111-1111-1111-111111111111', 
 'admin@physioflow.com', 
 'Admin User', 
 'admin', 
 '7c8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8', 
 '+91 98765 00001');

-- Step 3: Insert Doctors
-- Email: dr.sharma@physioflow.com | Password: doctor123
-- Email: dr.patel@physioflow.com | Password: doctor123
INSERT INTO users (id, email, name, role, password, phone) VALUES
('22222222-2222-2222-2222-222222222222', 
 'dr.sharma@physioflow.com', 
 'Dr. Rajesh Sharma', 
 'doctor', 
 '8d9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f89', 
 '+91 98765 00002'),
 
('33333333-3333-3333-3333-333333333333', 
 'dr.patel@physioflow.com', 
 'Dr. Priya Patel', 
 'doctor', 
 '8d9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f89', 
 '+91 98765 00003');

-- Step 4: Insert Patients (assigned to doctors)
-- Email: rahul.kumar@gmail.com | Password: patient123
-- Email: anita.verma@gmail.com | Password: patient123
-- Email: vikram.singh@gmail.com | Password: patient123
INSERT INTO users (id, email, name, role, password, phone, age, injury, doctor_id) VALUES
('44444444-4444-4444-4444-444444444444', 
 'rahul.kumar@gmail.com', 
 'Rahul Kumar', 
 'patient', 
 '9e0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f890', 
 '+91 98765 00004',
 28,
 'Knee Pain',
 '22222222-2222-2222-2222-222222222222'),

('55555555-5555-5555-5555-555555555555', 
 'anita.verma@gmail.com', 
 'Anita Verma', 
 'patient', 
 '9e0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f890', 
 '+91 98765 00005',
 35,
 'Back Pain',
 '22222222-2222-2222-2222-222222222222'),

('66666666-6666-6666-6666-666666666666', 
 'vikram.singh@gmail.com', 
 'Vikram Singh', 
 'patient', 
 '9e0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f890', 
 '+91 98765 00006',
 42,
 'Shoulder',
 '33333333-3333-3333-3333-333333333333');

-- Step 5: Insert Sample Exercises
INSERT INTO exercises (id, name, description, duration_seconds, difficulty, video_url, created_by) VALUES
('aaaa1111-1111-1111-1111-111111111111',
 'Knee Stretches',
 'Gentle knee stretching exercises for pain relief and flexibility improvement.',
 180,
 'easy',
 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 '22222222-2222-2222-2222-222222222222'),

('aaaa2222-2222-2222-2222-222222222222',
 'Lower Back Extension',
 'Core strengthening exercises targeting the lower back muscles.',
 240,
 'medium',
 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 '22222222-2222-2222-2222-222222222222'),

('aaaa3333-3333-3333-3333-333333333333',
 'Shoulder Rotation',
 'Rotator cuff exercises to improve shoulder mobility and strength.',
 150,
 'easy',
 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 '33333333-3333-3333-3333-333333333333'),

('aaaa4444-4444-4444-4444-444444444444',
 'Posture Correction',
 'Exercises to improve overall posture and reduce back strain.',
 300,
 'medium',
 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 '33333333-3333-3333-3333-333333333333');

-- Step 6: Assign exercises to patients
INSERT INTO patient_exercises (id, patient_id, exercise_id, assigned_by, reps_per_set, sets, notes, status) VALUES
('bbbb1111-1111-1111-1111-111111111111',
 '44444444-4444-4444-4444-444444444444',
 'aaaa1111-1111-1111-1111-111111111111',
 '22222222-2222-2222-2222-222222222222',
 10, 3, 'Do these stretches daily, preferably in the morning', 'assigned'),

('bbbb2222-2222-2222-2222-222222222222',
 '55555555-5555-5555-5555-555555555555',
 'aaaa2222-2222-2222-2222-222222222222',
 '22222222-2222-2222-2222-222222222222',
 8, 3, 'Start slowly and increase intensity gradually', 'assigned'),

('bbbb3333-3333-3333-3333-333333333333',
 '55555555-5555-5555-5555-555555555555',
 'aaaa4444-4444-4444-4444-444444444444',
 '22222222-2222-2222-2222-222222222222',
 5, 2, 'Focus on maintaining correct form', 'assigned'),

('bbbb4444-4444-4444-4444-444444444444',
 '66666666-6666-6666-6666-666666666666',
 'aaaa3333-3333-3333-3333-333333333333',
 '33333333-3333-3333-3333-333333333333',
 12, 4, 'Perform twice daily for best results', 'assigned');

-- =============================================
-- ⚠️ IMPORTANT: These password hashes are placeholders!
-- 
-- The easiest way to test is to:
-- 1. Run this script to insert the data
-- 2. Go to signup page and create fresh accounts
-- 3. Or update the password column manually after 
--    logging in with a newly created account
-- =============================================
