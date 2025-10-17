-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('farmer', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  soil_type TEXT,
  land_size TEXT,
  preferred_language TEXT DEFAULT 'en',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL DEFAULT 'farmer',
  UNIQUE (user_id, role)
);

-- Create chat_messages table for chatbot history
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  message_type TEXT DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create market_prices table
CREATE TABLE public.market_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name TEXT NOT NULL,
  region TEXT NOT NULL,
  price_per_kg DECIMAL(10, 2) NOT NULL,
  market_name TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schemes table
CREATE TABLE public.schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_name TEXT NOT NULL,
  description TEXT,
  eligibility TEXT,
  application_link TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for chat_messages
CREATE POLICY "Users can view their own messages"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for market_prices (public read)
CREATE POLICY "Anyone can view market prices"
  ON public.market_prices FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for schemes (public read)
CREATE POLICY "Anyone can view schemes"
  ON public.schemes FOR SELECT
  TO authenticated
  USING (true);

-- Create trigger for profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'farmer');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample market prices
INSERT INTO public.market_prices (crop_name, region, price_per_kg, market_name) VALUES
  ('Wheat', 'Punjab', 25.50, 'Ludhiana Mandi'),
  ('Rice', 'Haryana', 32.00, 'Karnal Mandi'),
  ('Cotton', 'Gujarat', 65.00, 'Ahmedabad Mandi'),
  ('Sugarcane', 'UP', 3.50, 'Muzaffarnagar Mandi'),
  ('Tomato', 'Maharashtra', 15.00, 'Pune Mandi');

-- Insert sample schemes
INSERT INTO public.schemes (scheme_name, description, eligibility, application_link, category) VALUES
  ('PM-KISAN', 'Direct income support of ₹6000 per year to all farmer families', 'All landholding farmers', 'https://pmkisan.gov.in', 'Income Support'),
  ('PMFBY', 'Crop insurance scheme providing coverage against crop loss', 'All farmers growing notified crops', 'https://pmfby.gov.in', 'Insurance'),
  ('KCC', 'Credit facility for farmers at subsidized interest rates', 'All farmers with land records', 'https://kcc.gov.in', 'Credit'),
  ('Soil Health Card', 'Free soil testing and recommendations', 'All farmers', 'https://soilhealth.dac.gov.in', 'Agricultural Support');