import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Almost Crackd Caption Voting",
  description:
    "Upload images, generate captions, and vote on the funniest results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
