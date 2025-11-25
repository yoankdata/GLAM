// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Il manque les variables d'environnement Supabase dans .env.local ou Vercel."
  );
}

// Client unique Supabase à réutiliser partout
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
