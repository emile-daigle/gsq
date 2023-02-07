import { createClient } from "@supabase/supabase-js";
import IGuide from "../../interfaces/IGuide";
import IGuideContent from "../../interfaces/IGuideContent";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]
  | IGuideContent["paragraphs"];

export interface Database {
  public: {
    Tables: {
      garages: {
        Row: {
          address: string;
          created_at: string | null;
          id: number;
          image: string;
          link: string;
          marker: string;
          name: string;
          phone: string;
          pos: Json;
        };
        Insert: {
          address?: string;
          created_at?: string | null;
          id?: number;
          image?: string;
          link?: string;
          marker?: string;
          name?: string;
          phone?: string;
          pos: Json;
        };
        Update: {
          address?: string;
          created_at?: string | null;
          id?: number;
          image?: string;
          link?: string;
          marker?: string;
          name?: string;
          phone?: string;
          pos?: Json;
        };
      };
      guides: {
        Row: {
          content: IGuideContent["paragraphs"];
          created_at: string | null;
          desc: string;
          id: number;
          image: string;
          link: string;
          longTitle: string;
          titre: string;
        };
        Insert: {
          content: Json;
          created_at?: string | null;
          desc?: string;
          id?: number;
          image?: string;
          link?: string;
          longTitle?: string;
          titre?: string;
        };
        Update: {
          content?: Json;
          created_at?: string | null;
          desc?: string;
          id?: number;
          image?: string;
          link?: string;
          longTitle?: string;
          titre?: string;
        };
      };
      testing: {
        Row: {
          created_at: string | null;
          id: number;
          test: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          test?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          test?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
