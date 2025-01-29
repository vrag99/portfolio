"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import CommandMenu from "./command-menu";
import { Command } from "@/lib/types";
import { useChatStore } from "@/lib/store/chat-store";

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

const AskBox = ({
  commandBoxPosition = "top",
}: {
  commandBoxPosition?: "top" | "bottom";
}) => {
  const { userInput: inputValue, setUserInput: setInputValue } = useChatStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasSelectedCommand, setHasSelectedCommand] = useState(false);

  const { addBubble, addAiLoadingBubble } = useChatStore();

  useEffect(() => {
    if (inputValue.startsWith("/") && !hasSelectedCommand) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [inputValue, hasSelectedCommand]);

  const handleCommandSelect = (command: Command) => {
    setInputValue(command.name);
    setIsMenuOpen(false);
    setHasSelectedCommand(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === "") return;
    if (hasSelectedCommand || inputValue) {
      addBubble({
        sender: "user",
        data: inputValue,
      });
      addAiLoadingBubble();
      setInputValue("");
      setHasSelectedCommand(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col">
      <Input
        type="text"
        value={inputValue}
        ref={inputRef}
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
        position={commandBoxPosition}
      />
    </form>
  );
};

export default AskBox;
