-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create enum for turtle status
CREATE TYPE public.turtle_status AS ENUM ('active', 'missing', 'released', 'deceased');

-- Create enum for threat level
CREATE TYPE public.threat_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create turtles table
CREATE TABLE public.turtles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  tag_id TEXT UNIQUE NOT NULL,
  status turtle_status NOT NULL DEFAULT 'active',
  threat_level threat_level NOT NULL DEFAULT 'low',
  age INTEGER,
  weight DECIMAL(6,2),
  length DECIMAL(6,2),
  photo_url TEXT,
  last_latitude DECIMAL(10,7),
  last_longitude DECIMAL(10,7),
  last_seen TIMESTAMPTZ DEFAULT now(),
  temperature DECIMAL(4,1),
  speed DECIMAL(5,2),
  depth DECIMAL(6,2),
  health_status TEXT DEFAULT 'Healthy',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create turtle_locations table for tracking history
CREATE TABLE public.turtle_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  turtle_id UUID NOT NULL REFERENCES public.turtles(id) ON DELETE CASCADE,
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL,
  temperature DECIMAL(4,1),
  speed DECIMAL(5,2),
  depth DECIMAL(6,2),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create beaches table
CREATE TABLE public.beaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  nests_count INTEGER NOT NULL DEFAULT 0,
  volunteers_count INTEGER NOT NULL DEFAULT 0,
  threat_level threat_level NOT NULL DEFAULT 'low',
  threats TEXT[] DEFAULT '{}',
  last_patrol TIMESTAMPTZ,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create nests table
CREATE TABLE public.nests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  beach_id UUID NOT NULL REFERENCES public.beaches(id) ON DELETE CASCADE,
  turtle_id UUID REFERENCES public.turtles(id) ON DELETE SET NULL,
  eggs_count INTEGER NOT NULL DEFAULT 0,
  hatched_count INTEGER DEFAULT 0,
  laid_date DATE NOT NULL,
  expected_hatch_date DATE,
  actual_hatch_date DATE,
  status TEXT NOT NULL DEFAULT 'incubating',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  severity threat_level NOT NULL DEFAULT 'low',
  turtle_id UUID REFERENCES public.turtles(id) ON DELETE SET NULL,
  beach_id UUID REFERENCES public.beaches(id) ON DELETE SET NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create stats table for dashboard
CREATE TABLE public.stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_turtles INTEGER NOT NULL DEFAULT 0,
  active_turtles INTEGER NOT NULL DEFAULT 0,
  total_nests INTEGER NOT NULL DEFAULT 0,
  hatched_eggs INTEGER NOT NULL DEFAULT 0,
  active_volunteers INTEGER NOT NULL DEFAULT 0,
  protected_beaches INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(stat_date)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turtles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turtle_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User roles policies (only admins can manage roles)
CREATE POLICY "Roles viewable by admins"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Turtles policies (public read, admin write)
CREATE POLICY "Turtles viewable by everyone"
  ON public.turtles FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert turtles"
  ON public.turtles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update turtles"
  ON public.turtles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete turtles"
  ON public.turtles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Turtle locations policies
CREATE POLICY "Turtle locations viewable by everyone"
  ON public.turtle_locations FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert turtle locations"
  ON public.turtle_locations FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Beaches policies
CREATE POLICY "Beaches viewable by everyone"
  ON public.beaches FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert beaches"
  ON public.beaches FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update beaches"
  ON public.beaches FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete beaches"
  ON public.beaches FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Nests policies
CREATE POLICY "Nests viewable by everyone"
  ON public.nests FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert nests"
  ON public.nests FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update nests"
  ON public.nests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete nests"
  ON public.nests FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Alerts policies
CREATE POLICY "Alerts viewable by authenticated users"
  ON public.alerts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert alerts"
  ON public.alerts FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update alerts"
  ON public.alerts FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete alerts"
  ON public.alerts FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Stats policies
CREATE POLICY "Stats viewable by everyone"
  ON public.stats FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert stats"
  ON public.stats FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update stats"
  ON public.stats FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Update triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_turtles_updated_at
  BEFORE UPDATE ON public.turtles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_beaches_updated_at
  BEFORE UPDATE ON public.beaches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_nests_updated_at
  BEFORE UPDATE ON public.nests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Enable realtime for live tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.turtles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.turtle_locations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;

-- Set replica identity for realtime
ALTER TABLE public.turtles REPLICA IDENTITY FULL;
ALTER TABLE public.turtle_locations REPLICA IDENTITY FULL;
ALTER TABLE public.alerts REPLICA IDENTITY FULL;

-- Create indexes for performance
CREATE INDEX idx_turtle_locations_turtle_id ON public.turtle_locations(turtle_id);
CREATE INDEX idx_turtle_locations_recorded_at ON public.turtle_locations(recorded_at);
CREATE INDEX idx_nests_beach_id ON public.nests(beach_id);
CREATE INDEX idx_alerts_created_at ON public.alerts(created_at);