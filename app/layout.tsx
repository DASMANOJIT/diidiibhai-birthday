import type { Metadata } from "next";
import BackgroundMusic from "@/components/BackgroundMusic";
import "./globals.css";

export const metadata: Metadata = {
  title: "Birthday Memory Gallery",
  description: "A dreamy scroll-driven birthday memory gallery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
