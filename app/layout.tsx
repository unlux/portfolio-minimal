import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import Head from "next/head";
import "react-notion-x/src/styles.css";
import ClickSpark from "./components/ui/ClickSpark";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "unlux",
    template: "%s | unlux ",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "My Portfolio",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cx(
        "dark text-black dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <link rel="icon" href="./favicon.ico" sizes="any" />
      <body className={cx("vsc-initialized")}>
        <ClickSpark>
          <main className=" antialiased max-w-xl mx-4 mt-8 lg:mx-auto flex-auto min-w-0 flex flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ClickSpark>
      </body>
    </html>
  );
}
