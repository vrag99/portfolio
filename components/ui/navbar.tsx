"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
  return (
    <nav className="flex flex-row gap-8 pr-8 items-center h-9 bg-background/60 backdrop-blur-md mx-auto sticky rounded-xl top-4 border shadow-sm">
      <div className="h-9 w-9 border-r bg-secondary/20 text-primary rounded-l-xl grid place-items-center font-bold">
        G
      </div>
      <div className="flex flex-row items-baseline gap-8">
        {NAV_ITEMS.map((item, index) => (
          <Link
            className={cn(
              "font-highlight text-muted-foreground tracking-tight italic transition-colors duration-300",
              pathname === item.href
                ? "text-primary underline underline-offset-4 font-medium decoration-secondary/70 decoration-wavy"
                : "hover:text-primary"
            )}
            href={item.href}
            key={index}
          >
            /{item.label.toLowerCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
