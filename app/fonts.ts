import localFont from "next/font/local";

export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
});

export const newsreader = localFont({
  src: [
    { path: "./fonts/Newsreader-Variable.ttf", 
      style: "normal" 
    },
    {
      path: "./fonts/Newsreader-Italic-Variable.ttf",
      style: "italic",
    },
  ],
  variable: "--font-newsreader",
});
