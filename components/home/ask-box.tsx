"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";

interface Command {
  name: string;
  description: string;
}

const commands: Command[] = [
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

export default function AskBox() {
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState<Command[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasSelectedCommand, setHasSelectedCommand] = useState(false);

  useEffect(() => {
    if (inputValue.startsWith("/") && !hasSelectedCommand) {
      setIsMenuOpen(true);
      setFilteredCommands(
        commands.filter((command) => command.name.includes(inputValue))
      );
    } else {
      setIsMenuOpen(false);
    }
  }, [inputValue]);

  const handleCommandSelect = (command: Command) => {
    setIsMenuOpen(false);
    setHasSelectedCommand(true);
    setInputValue(command.name);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          setSelectedIndex((prev) =>
            Math.min(prev + 1, filteredCommands.length - 1)
          );
          break;
        case "ArrowUp":
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          handleCommandSelect(filteredCommands[selectedIndex]);
          break;
        default:
          break;
      }
    },
    [selectedIndex, filteredCommands]
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isMenuOpen]);

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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            layout
            transition={{
              opacity: { duration: 0.2 },
              layout: {
                type: "spring",
                bounce: 0.25,
                duration: 0.5,
              },
            }}
            className={cn(
              "w-full",
              "rounded-2xl",
              "absolute top-16"
            )}
          >
            <div className="flex flex-col gap-2">
              {filteredCommands.map((command, index) => (
                <button
                  key={command.name}
                  className={cn(
                    "grid grid-cols-7 gap-4",
                    "rounded-2xl px-4 py-2",
                    "border border-muted",
                    "transition-all duration-300",
                    selectedIndex === index
                      ? "bg-secondary/10 border-b-2 border-b-input"
                      : "hover:bg-secondary/5"
                  )}
                  onClick={() => handleCommandSelect(command)}
                >
                  <p
                    className="col-span-2 text-left font-highlight italic"
                    onClick={() => handleCommandSelect(command)}
                  >
                    {command.name}
                  </p>
                  <p className="col-span-5 text-sm text-left text-muted-foreground">
                    {command.description}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
