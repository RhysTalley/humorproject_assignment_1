export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      caption_votes: {
        Row: {
          id: number;
          created_datetime_utc: string;
          modified_datetime_utc: string | null;
          vote_value: number;
          profile_id: string;
          caption_id: string;
        };
        Insert: {
          id?: number;
          created_datetime_utc: string;
          modified_datetime_utc?: string | null;
          vote_value: number;
          profile_id: string;
          caption_id: string;
        };
        Update: {
          id?: number;
          created_datetime_utc?: string;
          modified_datetime_utc?: string | null;
          vote_value?: number;
          profile_id?: string;
          caption_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "caption_votes_caption_id_fkey";
            columns: ["caption_id"];
            referencedRelation: "captions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "caption_votes_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      captions: {
        Row: {
          id: string;
          created_datetime_utc: string;
          modified_datetime_utc: string | null;
          content: string | null;
          is_public: boolean;
          profile_id: string;
          image_id: string;
          humor_flavor_id: number | null;
          is_featured: boolean;
          caption_request_id: number | null;
          like_count: number;
          llm_prompt_chain_id: number | null;
        };
        Insert: {
          id?: string;
          created_datetime_utc?: string;
          modified_datetime_utc?: string | null;
          content?: string | null;
          is_public: boolean;
          profile_id: string;
          image_id: string;
          humor_flavor_id?: number | null;
          is_featured?: boolean;
          caption_request_id?: number | null;
          like_count?: number;
          llm_prompt_chain_id?: number | null;
        };
        Update: {
          id?: string;
          created_datetime_utc?: string;
          modified_datetime_utc?: string | null;
          content?: string | null;
          is_public?: boolean;
          profile_id?: string;
          image_id?: string;
          humor_flavor_id?: number | null;
          is_featured?: boolean;
          caption_request_id?: number | null;
          like_count?: number;
          llm_prompt_chain_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "captions_caption_request_id_fkey";
            columns: ["caption_request_id"];
            referencedRelation: "caption_requests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "captions_humor_flavor_id_fkey";
            columns: ["humor_flavor_id"];
            referencedRelation: "humor_flavors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "captions_image_id_fkey";
            columns: ["image_id"];
            referencedRelation: "images";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "captions_llm_prompt_chain_id_fkey";
            columns: ["llm_prompt_chain_id"];
            referencedRelation: "llm_prompt_chains";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "captions_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      images: {
        Row: {
          id: string;
          created_datetime_utc: string;
          modified_datetime_utc: string | null;
          url: string | null;
          is_common_use: boolean | null;
          profile_id: string | null;
          additional_context: string | null;
          is_public: boolean | null;
          image_description: string | null;
          celebrity_recognition: string | null;
          embedding: unknown | null;
        };
        Insert: {
          id?: string;
          created_datetime_utc?: string;
          modified_datetime_utc?: string | null;
          url?: string | null;
          is_common_use?: boolean | null;
          profile_id?: string | null;
          additional_context?: string | null;
          is_public?: boolean | null;
          image_description?: string | null;
          celebrity_recognition?: string | null;
          embedding?: unknown | null;
        };
        Update: {
          id?: string;
          created_datetime_utc?: string;
          modified_datetime_utc?: string | null;
          url?: string | null;
          is_common_use?: boolean | null;
          profile_id?: string | null;
          additional_context?: string | null;
          is_public?: boolean | null;
          image_description?: string | null;
          celebrity_recognition?: string | null;
          embedding?: unknown | null;
        };
        Relationships: [
          {
            foreignKeyName: "images_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          id: string;
          created_datetime_utc: string | null;
          modified_datetime_utc: string | null;
          first_name: string | null;
          last_name: string | null;
          email: string | null;
          is_superadmin: boolean;
          is_in_study: boolean;
          is_matrix_admin: boolean;
        };
        Insert: {
          id: string;
          created_datetime_utc?: string | null;
          modified_datetime_utc?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          is_superadmin?: boolean;
          is_in_study?: boolean;
          is_matrix_admin?: boolean;
        };
        Update: {
          id?: string;
          created_datetime_utc?: string | null;
          modified_datetime_utc?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          is_superadmin?: boolean;
          is_in_study?: boolean;
          is_matrix_admin?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
