-- Add diet_plan column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS diet_plan TEXT;
