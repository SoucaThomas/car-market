"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CommandSelectorProps<T extends { id: number; label: string }> {
  text: string;
  data: T[];
  value: T | null;
  setValue: (v: T | null) => void; // Allow null
}

export function CommandSelector({
  data,
  text,
  value,
  setValue,
}: CommandSelectorProps<{ id: number; label: string }>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? data.find((data) => data.id === value.id)?.label
            : `Select ${text}...`}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${text}...`} />
          <CommandList>
            <CommandEmpty>No {text} found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={`${item.id}-${item.label}`}
                  value={item.label}
                  onSelect={(currentValue) => {
                    const selectedItem = data.find(
                      (item) => item.label === currentValue
                    );
                    if (selectedItem) {
                      // Modified logic to handle null
                      setValue(
                        value && selectedItem.id === value.id
                          ? null // Set to null if deselecting
                          : selectedItem
                      );
                    }
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value && value.id === item.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
