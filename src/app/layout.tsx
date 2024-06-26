import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Groq AI",
  description: "A simple high speed groq chatbot that solves any of your problem.",
  openGraph: {
    images: [
      {
        url: "https://i.postimg.cc/RV1T5Y5T/marvel-iron-man-in-destroyed-suit-desktop-wallpaper-preview.webp",
        width: 1000,
        height: 600,
      },
    ],
  },
  icons: {
    icon: "./favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
