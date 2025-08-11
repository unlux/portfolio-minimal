import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/footer";
import { baseUrl } from "./sitemap";
import ClickSpark from "@/components/ui/ClickSpark";
import LenisProvider from "@/components/LenisProvider";
import { ClerkProvider } from "@clerk/nextjs";

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

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const AppShell = (
    <LenisProvider>
      <ClickSpark>
        <main className=" antialiased max-w-xl mx-4 mt-8 lg:mx-auto flex-auto min-w-0 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </ClickSpark>
    </LenisProvider>
  );

  return (
    <html
      lang="en"
      className={cx(
        "dark dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className={cx("bg-white dark:bg-black vsc-initialized")}>
        {clerkPublishableKey ? (
          <ClerkProvider publishableKey={clerkPublishableKey}>
            {AppShell}
          </ClerkProvider>
        ) : (
          AppShell
        )}
      </body>
    </html>
  );
}
