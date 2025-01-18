"use client";

import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import CommandMenu from "./command-menu";
import { Command } from "@/lib/types";

const COMMANDS: Command[] = [
  {
    name: "/about",
    description: "know more about me",
  },
  {
    name: "/projects",
    description: "see what I have built",
  },
  {
    name: "/achievements",
    description: "view my achievements",
  },
  {
    name: "/help",
    description: "get help with navigating the site",
  },
];

const AskBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasSelectedCommand, setHasSelectedCommand] = useState(false);

  useEffect(() => {
    if (inputValue.startsWith("/") && !hasSelectedCommand) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [inputValue]);

  const handleCommandSelect = (command: Command) => {
    setIsMenuOpen(false);
    setHasSelectedCommand(true);
    setInputValue(command.name);
  };

  return (
    <div className="relative flex flex-col">
      <Input
        type="text"
        value={inputValue}
        className={cn(
          "h-14",
          "px-5 py-4",
          "!text-base font-normal",
          "border border-b-2 border-muted border-b-input rounded-2xl",
          "transition-colors duration-300 focus:border-b-secondary/60"
        )}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (e.target.value === "") {
            setHasSelectedCommand(false);
          }
        }}
        placeholder={`Ask me anything :) | Type "/" for commands`}
      />
      <CommandMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        commands={COMMANDS}
        search={inputValue}
        selectCommand={handleCommandSelect}
        position="bottom"
      />
    </div>
  );
};

export default AskBox;
