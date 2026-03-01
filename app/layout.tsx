import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhitePandas — Standup Icebreaker Generator",
  description: "Fresh icebreaker questions for your weekly team standup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
