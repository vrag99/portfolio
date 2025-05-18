"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import CommandMenu from "./command-menu";
import { Command } from "@/lib/types";
import { COMMANDS } from "@/lib/constants";
import { useAnswerUser } from "@/lib/prompt";
import { useTransitionRouter } from "next-view-transitions";
import { useChatStore } from "@/lib/store/chat-store";

const AskBox = ({
  commandBoxPosition = "top",
  navigateToChat = false,
}: {
  commandBoxPosition?: "top" | "bottom";
  navigateToChat?: boolean;
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasSelectedCommand, setHasSelectedCommand] = useState(false);
  const { resetThread } = useChatStore();
  const answerUser = useAnswerUser();
  const router = useTransitionRouter();

  useEffect(() => {
    if (inputValue.startsWith("/") && !hasSelectedCommand) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [inputValue, hasSelectedCommand]);

  const handleCommandSelect = (command: Command) => {
    console.log("command recieved", command);
    setInputValue(command.name);
    setIsMenuOpen(false);
    setHasSelectedCommand(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    inputRef.current?.blur();
    if (inputValue === "") return;
    if (navigateToChat) {
      resetThread();
      answerUser(inputValue);
      router.push("/chat");
    } else {
      answerUser(inputValue);
    }
    setInputValue("");
    setHasSelectedCommand(false);
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
          "border-muted border-b-2 border-b-input dark:bg-card rounded-2xl",
          "transition-colors duration-300 focus:border-b-secondary/60"
        )}
        onChange={(e) => {
          if (e.target.value === "") {
            setHasSelectedCommand(false);
          }
          setInputValue(e.target.value);
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
