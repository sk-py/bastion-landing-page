import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SeoSchema } from "@/components/seo-schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://bastion.skpy.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Bastion — Open Source Server Management Console",
    template: "%s | Bastion",
  },

  description:
    "Bastion is an open-source, self-hosted server management console for browser-based SSH access, server administration, file transfer, and session recording.",

  applicationName: "Bastion",

  keywords: [
    "Bastion",
    "server management",
    "server management console",
    "server management software",
    "open source server management",
    "self hosted server management",
    "self-hosted server management console",
    "SSH management",
    "SSH server management",
    "browser SSH",
    "web SSH",
    "SSH terminal",
    "remote server management",
    "server access",
    "SSH session recording",
    "terminal session recording",
    "server session recording",
    "SSH file transfer",
    "self hosted SSH",
    "open source SSH",
    "infrastructure management",
    "Linux server management",
  ],

  authors: [
    {
      name: "Bastion",
      url: siteUrl,
    },
  ],

  creator: "Bastion",
  publisher: "Bastion",

  category: "Developer Tools",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Bastion",
    title: "Bastion — Open Source Server Management Console",
    description:
      "Self-hosted server management with browser-based SSH, file transfer, session recording, workspaces, and access control.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bastion — Open Source Server Management Console",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Bastion — Open Source Server Management Console",
    description:
      "Self-hosted server management with browser-based SSH, file transfer, and session recording.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "cAEUD5tUkBH5apNXsw2QlpVeJFLnRg-xBlu5vm0UnEw",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <SeoSchema />
      <body className="antialiased">{children}</body>
    </html>
  );
}