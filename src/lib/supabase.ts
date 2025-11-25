// Initialise le client Supabase en utilisant les variables d'environnement
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Ceci va générer une erreur fatale si les clés ne sont pas dans .env.local ou Vercel
  throw new Error('Il manque les variables d\'environnement Supabase dans .env.local ou Vercel.');
}

// Crée le client Supabase typé
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);