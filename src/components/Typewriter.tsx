"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export function Typewriter({ text, delay = 50, className = "" }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      // Reset after completion for loop
      const resetTimeout = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex(0);
      }, 3000);

      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">▊</span>
    </span>
  );
}

interface TerminalCommandProps {
  commands: string[];
  className?: string;
}

export function TerminalCommand({ commands, className = "" }: TerminalCommandProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([]);

  useEffect(() => {
    if (currentCommandIndex < commands.length) {
      const timeout = setTimeout(() => {
        setDisplayedCommands(prev => [...prev, commands[currentCommandIndex]]);
        setCurrentCommandIndex(prev => prev + 1);
      }, 1500);

      return () => clearTimeout(timeout);
    } else {
      // Reset for loop
      const resetTimeout = setTimeout(() => {
        setDisplayedCommands([]);
        setCurrentCommandIndex(0);
      }, 5000);

      return () => clearTimeout(resetTimeout);
    }
  }, [currentCommandIndex, commands]);

  return (
    <div className={`font-mono text-sm bg-black/40 border border-green-500/20 rounded-xl p-6 ${className}`}>
      {displayedCommands.map((cmd, i) => (
        <div key={i} className="mb-2">
          <span className="text-green-500">$</span> <span className="text-green-100/80">{cmd}</span>
        </div>
      ))}
      {currentCommandIndex < commands.length && (
        <div>
          <span className="text-green-500">$</span> <span className="animate-pulse">▊</span>
        </div>
      )}
    </div>
  );
}
