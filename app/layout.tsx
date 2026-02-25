import { Geist, Geist_Mono } from "next/font/google";
import { ScreenWidthProvider } from "./hooks/ScreenWidthProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import ThemeProvider from "./components/global/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://dryd3n.ca"),
  title: {
    default: "Dryden Bryson",
    template: "%s | Dryden Bryson",
  },
  description: "Creative technology portfolio by Dryden Bryson",
  openGraph: {
    title: "Dryden Bryson",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    description:
      "Computer science student and software developer building performant systems and modern web applications.",
    url: "https://dryd3n.ca",
    siteName: "Dryden Bryson",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dryden Bryson",
    description:
      "Computer science student and software developer building performant systems and modern web applications.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/arame-mono.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
      <SpeedInsights />
        <ThemeProvider>
          <ScreenWidthProvider>{children}</ScreenWidthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
