/*
  # Fix infinite recursion in user_profiles RLS policies

  1. Problem
    - Current RLS policies on user_profiles table create infinite recursion
    - Policies reference user_profiles table within their own conditions
    - This causes circular dependency when checking permissions

  2. Solution
    - Drop existing problematic policies
    - Create new policies that don't reference user_profiles table recursively
    - Use auth.uid() and auth.jwt() functions instead of subqueries
    - Simplify policy logic to avoid circular dependencies

  3. New Policies
    - Users can manage their own profiles using auth.uid()
    - Admins identified through JWT claims or separate admin check
    - Remove recursive subqueries from policy conditions
*/

-- Drop all existing policies on user_profiles table
DROP POLICY IF EXISTS "Admins can read all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to delete their own profiles" ON user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own profiles" ON user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to select their own profiles" ON user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to update their own profiles" ON user_profiles;
DROP POLICY IF EXISTS "Superadmins can insert profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Create new simplified policies without recursion

-- Policy for users to read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy for users to update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy for users to insert their own profile (during registration)
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policy for users to delete their own profile
CREATE POLICY "Users can delete own profile"
  ON user_profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Note: Admin policies will be handled through a separate admin function
-- that doesn't create recursive dependencies. For now, admins can use
-- the service role key for administrative operations.

-- Create a function to check if user is admin (non-recursive)
CREATE OR REPLACE FUNCTION is_admin_user(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = user_id 
    AND (
      raw_user_meta_data->>'role' = 'admin' OR 
      raw_user_meta_data->>'role' = 'superadmin'
    )
  );
$$;

-- Admin policies using the non-recursive function
CREATE POLICY "Admins can read all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (is_admin_user(auth.uid()));

CREATE POLICY "Admins can update all profiles"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (is_admin_user(auth.uid()));

CREATE POLICY "Admins can insert any profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin_user(auth.uid()));

CREATE POLICY "Admins can delete any profile"
  ON user_profiles
  FOR DELETE
  TO authenticated
  USING (is_admin_user(auth.uid()));