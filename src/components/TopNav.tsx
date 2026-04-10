"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AuthStatus = "loading" | "signedOut" | "signedIn";

type TopNavProps = {
  authStatus: AuthStatus;
  onSignOut: () => void;
};

export default function TopNav({ authStatus, onSignOut }: TopNavProps) {
  const pathname = usePathname();
  const isPopularActive = pathname === "/";
  const isUploadsActive = pathname?.startsWith("/uploads");

  return (
    <header className="sticky top-4 z-30 mb-10">
      <div className="relative flex items-center justify-center rounded-full border border-zinc-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
        <nav className="flex items-center justify-center gap-3 text-base font-semibold text-zinc-700">
          <Link
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition ${
              isPopularActive
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
            href="/"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 2.5a.75.75 0 0 1 .673.418l1.872 3.794 4.188.608a.75.75 0 0 1 .416 1.279l-3.03 2.954.715 4.17a.75.75 0 0 1-1.088.79L10 14.544l-3.746 1.969a.75.75 0 0 1-1.088-.79l.716-4.17-3.03-2.954a.75.75 0 0 1 .416-1.28l4.188-.607 1.872-3.794A.75.75 0 0 1 10 2.5Z" />
            </svg>
            Popular Captions
          </Link>
          <Link
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition ${
              isUploadsActive
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
            href="/uploads"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3.5 5A2.5 2.5 0 0 1 6 2.5h2.379c.398 0 .78.158 1.06.44l1.121 1.12c.14.141.331.22.53.22H14A2.5 2.5 0 0 1 16.5 6.78v6.72A2.5 2.5 0 0 1 14 16H6a2.5 2.5 0 0 1-2.5-2.5V5Z" />
            </svg>
            Your Uploads
          </Link>
        </nav>
        {authStatus === "signedIn" && (
          <div className="absolute right-4">
            <button
              className="inline-flex items-center justify-center rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
              onClick={onSignOut}
              type="button"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
