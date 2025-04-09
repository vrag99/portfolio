import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import { AnimatePresence } from "motion/react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Command } from "@/lib/types";

interface CommandMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  commands: Command[];
  search: string;
  selectCommand: (command: Command) => void;
  position: "top" | "bottom";
}

const CommandMenu = ({
  isOpen,
  commands,
  search,
  selectCommand,
  position = "bottom",
}: CommandMenuProps) => {
  const [filteredCommands, setFilteredCommands] = useState<Command[]>(commands);
  useEffect(() => {
    setFilteredCommands(
      commands.filter((command) => command.name.includes(search))
    );
  }, [search, commands]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          if (position === "bottom") {
            setSelectedIndex((prev) =>
              Math.min(prev + 1, filteredCommands.length - 1)
            );
          } else {
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
          }
          break;
        case "ArrowUp":
          if (position === "bottom") {
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
          } else {
            setSelectedIndex((prev) =>
              Math.min(prev + 1, filteredCommands.length - 1)
            );
          }
          break;
        case "Enter":
          selectCommand(filteredCommands[selectedIndex]);
          break;
        default:
          break;
      }
    },
    [position, selectCommand, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: position === "bottom" ? -10 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === "bottom" ? 10 : -10 }}
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
            "absolute backdrop-blur-lg bg-background",
            position === "bottom" ? "top-16" : "bottom-16"
          )}
        >
          <div
            className={cn(
              "flex gap-2",
              position === "bottom" ? "flex-col" : "flex-col-reverse"
            )}
          >
            {filteredCommands.map((command, index) => (
              <div
                key={command.name}
                tabIndex={index}
                className={cn(
                  "grid grid-cols-7 gap-4",
                  "rounded-xl px-4 py-2",
                  "border border-muted",
                  "transition-all duration-300",
                  selectedIndex === index
                    ? "bg-secondary/10 border-b-2 border-b-input"
                    : "hover:bg-secondary/5"
                )}
                onClick={() => selectCommand(command)}
              >
                <p className="col-span-2 text-left font-highlight italic">
                  {command.name}
                </p>
                <p className="col-span-5 text-sm text-left text-muted-foreground">
                  {command.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandMenu;
