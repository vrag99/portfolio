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
            "absolute backdrop-blur-md bg-background/80 dark:bg-card/80 border shadow-sm",
            position === "bottom" ? "top-16" : "bottom-16"
          )}
        >
          <div
            className={cn(
              "flex rounded-lg p-1.5",
              position === "bottom" ? "flex-col" : "flex-col-reverse"
            )}
          >
            {filteredCommands.map((command, index) => (
              <div
                key={command.name}
                tabIndex={index}
                className={cn(
                  "grid grid-cols-8 gap-4",
                  "rounded-lg px-4 py-1.5",
                  "*:transition-all",
                  selectedIndex === index
                    ? "bg-secondary/10 dark:bg-secondary border-b-2"
                    : "hover:bg-secondary/5"
                )}
                onClick={() => selectCommand(command)}
              >
                <p
                  className={cn(
                    "col-span-3 text-left font-mono font-normal tracking-tight text-sm text-muted-foreground",
                    selectedIndex === index && "text-foreground dark:text-secondary-foreground"
                  )}
                >
                  {command.name}
                </p>
                <p
                  className={cn(
                    "col-span-5 text-sm text-left text-muted-foreground brightness-150 dark:brightness-50",
                    selectedIndex === index && "brightness-100 dark:brightness-100"
                  )}
                >
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
