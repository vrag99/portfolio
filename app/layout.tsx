import type { Metadata, Viewport } from "next";
import "./globals.css";
import { newsreader, satoshi, geistMono } from "./fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { ViewTransitions } from "next-view-transitions";

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Garv Makkar",
  description: "I like to make stuff and break stuff",
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
          className={`${satoshi.variable} ${newsreader.variable} ${geistMono.variable} font-sans antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
