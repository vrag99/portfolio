import type { Metadata } from "next";
import "./globals.css";
import { newsreader, geistMono, satoshi } from "./fonts";
import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "Garv Makkar",
  description: "This is my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
        className={`${satoshi.variable} ${geistMono.variable} ${newsreader.variable} font-sans antialiased w-full h-screen flex flex-col`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
