import type { Metadata } from "next";
import "./globals.css";
import { newsreader, geistMono, satoshi, architectsDaughter } from "./fonts";
import Navbar from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ViewTransitions } from "next-view-transitions";

export const metadata: Metadata = {
  title: "Garv Makkar",
  description: "Design. Dismantle. Discover.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          {process.env.NODE_ENV === "development" && (
            <script
              async
              src="https://unpkg.com/react-scan/dist/auto.global.js"
            />
          )}
        </head>
        <body
          className={`${satoshi.variable} ${architectsDaughter.variable} ${geistMono.variable} ${newsreader.variable} font-sans antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
