import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anish-portfolio-beige.vercel.app"),
  title: "Anish Singhal — Graphic & Visual Designer",
  description:
    "Portfolio of Anish Singhal, a Graphic and Visual Designer specializing in branding, social media design, merchandise, digital design, and creative visual communication.",

  alternates: {
    canonical: "https://anish-portfolio-beige.vercel.app",
  },

  openGraph: {
    title: "Anish Singhal — Graphic & Visual Designer",
    description:
      "Portfolio of Anish Singhal, a Graphic and Visual Designer specializing in branding, social media design, merchandise, digital design, and creative visual communication.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anish Singhal — Graphic & Visual Designer",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Anish Singhal — Graphic & Visual Designer",
    description:
      "Portfolio of Anish Singhal, a Graphic and Visual Designer specializing in branding, social media design, merchandise, digital design, and creative visual communication.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
