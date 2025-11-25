// Fichier généré à partir de votre schéma Supabase pour TypeScript
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      providers: {
        Row: {
          id: string
          name: string
          slug: string
          bio: string
          specialties: string[]
          services_details: string[]
          commune: string
          price_min: number
          whatsapp: string
          instagram: string | null
          main_photo_url: string
          portfolio_photo_urls: string[]
          plan: 'standard_trimestre' | 'pro_annuel' | 'premium_annuel'
          is_active: boolean
          subscription_expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          bio: string
          specialties: string[]
          services_details?: string[]
          commune: string
          price_min: number
          whatsapp: string
          instagram?: string | null
          main_photo_url: string
          portfolio_photo_urls?: string[]
          plan?: 'standard_trimestre' | 'pro_annuel' | 'premium_annuel'
          is_active?: boolean
          subscription_expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          bio?: string
          specialties?: string[]
          services_details?: string[]
          commune?: string
          price_min?: number
          whatsapp?: string
          instagram?: string | null
          main_photo_url?: string
          portfolio_photo_urls?: string[]
          plan?: 'standard_trimestre' | 'pro_annuel' | 'premium_annuel'
          is_active?: boolean
          subscription_expires_at?: string | null
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          provider_id: string
          plan: string
          amount_fcfa: number
          paid_via: string
          payment_reference: string | null
          paid_at: string
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          plan: string
          amount_fcfa: number
          paid_via: string
          payment_reference?: string | null
          paid_at: string
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          plan?: string
          amount_fcfa?: number
          paid_via?: string
          payment_reference?: string | null
          paid_at?: string
          expires_at?: string
          created_at?: string
        }
      }
    }
  }
}