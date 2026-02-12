"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";

export default function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const finalizeAuth = async () => {
      const code = searchParams.get("code");
      if (code) {
        await supabaseClient.auth.exchangeCodeForSession(code);
      }
      router.replace("/");
    };

    void finalizeAuth();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <main className="mx-auto max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm">
        Finishing sign-in, redirecting you to the homepage...
      </main>
    </div>
  );
}
