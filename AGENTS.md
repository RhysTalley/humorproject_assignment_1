This is a class project designed around using AI to help build projects on top of a real production level database inside supabase.

The only necessary schema right now is the schema for the "images" table. The complete schema for this table is located inside `schema.sql`.

Supabase-generated types are stored in `src/types/supabase.ts`. Reference this file for types instead of re-ingesting schema text.

Never suggest editing anything about Supabase policies, table schema, or anything else administrative. I am working with a database that is not mine and cannot edit it freely. The only edits I can make are to individual rows within the database.
I cannot provide a service role key, all changes must adhere to RLS policies.