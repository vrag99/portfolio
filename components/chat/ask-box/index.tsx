"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import CommandMenu from "./command-menu";
import { Command } from "@/lib/types";
import { COMMANDS, THINKING_PHRASES } from "@/lib/constants";
import { ChatStatus } from "ai";
import { Button } from "@/components/ui/button";
import { Send, Squircle } from "lucide-react";

const AskBox = ({
  commandBoxPosition = "top",
  onSendMessage,
  status,
}: {
  commandBoxPosition?: "top" | "bottom";
  onSendMessage: ({ text }: { text: string }) => void;
  status: ChatStatus;
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasSelectedCommand, setHasSelectedCommand] = useState(false);

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
    onSendMessage({ text: inputValue });
    setInputValue("");
    setHasSelectedCommand(false);
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col">
      <div className="flex flex-row relative items-center">
        <Input
          type="text"
          value={inputValue}
          ref={inputRef}
          disabled={isLoading}
          className={cn(
            "h-14",
            "px-5 py-4",
            "font-normal !text-base",
            "border-muted border-b-2 border-b-input dark:bg-card rounded-2xl",
            "transition-colors duration-300 focus:border-b-secondary/60"
          )}
          onChange={(e) => {
            if (e.target.value === "") {
              setHasSelectedCommand(false);
            }
            setInputValue(e.target.value);
          }}
          placeholder={
            isLoading
              ? `Hol'up, processing that... `
              : `Ask me anything :) | Type "/" for commands`
          }
        />
        <Button
          className="rounded-xl border-b-2 absolute right-2"
          size={"icon"}
          disabled={isLoading}
          variant={"secondary"}
        >
          {isLoading ? <Squircle className="animate-spin" /> : <Send />}
        </Button>
      </div>
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
