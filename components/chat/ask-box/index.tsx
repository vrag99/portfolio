"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import CommandMenu from "./command-menu";
import { Command } from "@/lib/types";
import { COMMANDS } from "@/lib/constants";
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

  // Handle "/" key to focus input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if "/" is pressed and input is not already focused
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
        // Set the "/" character in the input
        setInputValue("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      <div
        className={cn(
          "flex flex-row items-center",
          "h-14",
          "border-muted border-b-2 border-b-input dark:bg-card rounded-2xl",
          "transition-colors duration-300 focus-within:border-b-secondary/60"
        )}
      >
        <Input
          type="text"
          value={inputValue}
          ref={inputRef}
          disabled={isLoading}
          className={cn(
            "pl-5 pr-3 py-4",
            "font-normal !text-base",
            "flex-1",
            "bg-transparent border-none"
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
          className="rounded-xl border-b-2 mr-2"
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
