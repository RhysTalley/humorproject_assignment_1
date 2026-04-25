"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  clearPostAuthRedirect,
  loadPostAuthRedirect,
} from "@/lib/authRedirect";
import { supabaseClient } from "@/lib/supabaseClient";

export default function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const finalizeAuth = async () => {
      const code = searchParams.get("code");
      const redirectPath = loadPostAuthRedirect();
      if (code) {
        await supabaseClient.auth.exchangeCodeForSession(code);
      }
      clearPostAuthRedirect();
      router.replace(redirectPath);
    };

    void finalizeAuth();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <main className="mx-auto max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm">
        Finishing sign-in and returning you to the app...
      </main>
    </div>
  );
}
