import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

type ImageRow = {
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
};

export default async function Home() {
  const { data, error } = await supabaseServer
    .from("images")
    .select("*")
    .order("created_datetime_utc", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
        <div className="mx-auto max-w-4xl rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Images</h1>
          <p className="mt-3 text-sm text-red-600">
            Failed to load images: {error.message}
          </p>
        </div>
      </div>
    );
  }

  const images = (data ?? []) as ImageRow[];

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <main className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">Images</h1>
          <p className="text-sm text-zinc-600">
            {images.length} image{images.length === 1 ? "" : "s"} loaded from
            Supabase.
          </p>
        </header>
        {images.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center text-zinc-500">
            No images yet. Add rows to the images table to see them here.
          </div>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <article
                key={image.id}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={image.image_description ?? "Image"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
                      No image URL
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-400">
                      ID
                    </p>
                    <p className="mt-1 truncate text-sm font-medium text-zinc-900">
                      {image.id}
                    </p>
                  </div>
                  {image.image_description && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-zinc-400">
                        Description
                      </p>
                      <p className="mt-1 text-sm text-zinc-700">
                        {image.image_description}
                      </p>
                    </div>
                  )}
                  {(image.additional_context || image.celebrity_recognition) && (
                    <div className="text-sm text-zinc-600">
                      {image.additional_context && (
                        <p>{image.additional_context}</p>
                      )}
                      {image.celebrity_recognition && (
                        <p className="mt-2 italic text-zinc-500">
                          {image.celebrity_recognition}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="mt-auto grid gap-2 text-xs text-zinc-500">
                    <div className="flex items-center justify-between">
                      <span>Public</span>
                      <span>{image.is_public ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Common Use</span>
                      <span>{image.is_common_use ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Created</span>
                      <span>
                        {new Date(image.created_datetime_utc).toLocaleString()}
                      </span>
                    </div>
                    {image.modified_datetime_utc && (
                      <div className="flex items-center justify-between">
                        <span>Modified</span>
                        <span>
                          {new Date(
                            image.modified_datetime_utc,
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
