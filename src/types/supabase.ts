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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
