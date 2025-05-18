"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTheme } from "next-themes";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Chat",
    href: "/chat",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  return (
    <nav className={cn(
      "fixed flex items-center",
      "top-4 left-1/2 -translate-x-1/2 h-9 gap-4",
      "bg-background/60 dark:bg-card/60 backdrop-blur-md border shadow-sm rounded-xl z-50"
    )}>
      <div className="h-9 w-9 bg-secondary/20 dark:bg-secondary/60 text-primary rounded-l-xl grid place-items-center font-bold">
        G
      </div>
      <div className="flex flex-row items-baseline gap-8">
        {NAV_ITEMS.map((item, index) => (
          <Link
            className={cn(
              "font-serif italic text-muted-foreground transition-colors duration-300",
              pathname === item.href
                ? "text-primary underline underline-offset-4 font-medium decoration-secondary/70 dark:decoration-secondary-foreground/50 decoration-wavy"
                : "hover:text-primary"
            )}
            href={item.href}
            key={index}
          >
            /{item.label.toLowerCase()}
          </Link>
        ))}
      </div>
      <button
        className="bg-secondary/20 dark:bg-secondary/60 text-primary rounded-r-xl p-2 h-9 w-9 grid place-items-center"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-4 w-4 dark:hidden" />
        <Moon className="hidden h-4 w-4 dark:block" />
        <span className="sr-only">Toggle theme</span>
      </button>
    </nav>
  );
};

export default Navbar;
