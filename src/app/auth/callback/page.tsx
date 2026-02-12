import { Suspense } from "react";
import AuthCallbackClient from "./AuthCallbackClient";

export const dynamic = "force-dynamic";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
          <main className="mx-auto max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm">
            Finishing sign-in, redirecting you to the homepage...
          </main>
        </div>
      }
    >
      <AuthCallbackClient />
    </Suspense>
  );
}
