"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import type { Database } from "@/types/supabase";

type AuthStatus = "loading" | "signedOut" | "signedIn";

type ImageRow = Database["public"]["Tables"]["images"]["Row"];

export default function Home() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [images, setImages] = useState<ImageRow[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      setIsLoadingImages(true);
      const { data, error } = await supabaseClient
        .from("images")
        .select("*")
        .order("created_datetime_utc", { ascending: false });

      if (!isMounted) return;

      if (error) {
        setErrorMessage(error.message);
        setImages([]);
      } else {
        setImages((data ?? []) as ImageRow[]);
      }
      setIsLoadingImages(false);
    };

    supabaseClient.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) return;
        if (data.session) {
          setAuthStatus("signedIn");
          void loadImages();
        } else {
          setAuthStatus("signedOut");
        }
      })
      .catch((error) => {
        if (!isMounted) return;
        setAuthStatus("signedOut");
        setErrorMessage(error.message);
      });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session) {
        setAuthStatus("signedIn");
        void loadImages();
      } else {
        setAuthStatus("signedOut");
        setImages([]);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignOut = async () => {
    setErrorMessage(null);
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <main className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">Images</h1>
            {authStatus === "signedIn" && (
              <button
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                onClick={handleSignOut}
                type="button"
              >
                Sign out
              </button>
            )}
          </div>
          {authStatus === "signedIn" && (
            <div className="text-sm text-zinc-600">
              {isLoadingImages ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" />
                  Loading images...
                </span>
              ) : (
                <span>
                  {images.length} image{images.length === 1 ? "" : "s"} loaded
                  from Supabase.
                </span>
              )}
            </div>
          )}
        </header>

        {authStatus === "loading" && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm">
            Checking your session...
          </div>
        )}

        {authStatus === "signedOut" && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-600">
              You must sign in with Google to view this site.
            </p>
            <button
              className="mt-4 inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              onClick={handleGoogleSignIn}
              type="button"
            >
              Sign in with Google
            </button>
            {errorMessage && (
              <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
            )}
          </div>
        )}

        {authStatus === "signedIn" && isLoadingImages && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm">
            Loading images...
          </div>
        )}

        {authStatus === "signedIn" && errorMessage && !isLoadingImages && (
          <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Images</h2>
            <p className="mt-3 text-sm text-red-600">
              Failed to load images: {errorMessage}
            </p>
          </div>
        )}

        {authStatus === "signedIn" &&
        !isLoadingImages &&
        !errorMessage &&
        images.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center text-zinc-500">
            No images yet. Add rows to the images table to see them here.
          </div>
        ) : (
          authStatus === "signedIn" && (
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
                    {(image.additional_context ||
                      image.celebrity_recognition) && (
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
                          {new Date(
                            image.created_datetime_utc,
                          ).toLocaleString()}
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
          )
        )}

      </main>
    </div>
  );
}
