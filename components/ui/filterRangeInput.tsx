"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FilterRangeInputProps {
  label: string;
  valueFrom?: number | null;
  valueTo?: number | null;
  setValueFrom: (value: number | null) => void;
  setValueTo: (value: number | null) => void;
  placeholder?: string;
}

export function FilterRangeInput({
  label,
  valueFrom,
  valueTo,
  setValueFrom,
  setValueTo,
  placeholder = "",
}: FilterRangeInputProps) {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? null : Number.parseFloat(e.target.value);
    setValueFrom(value);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? null : Number.parseFloat(e.target.value);
    setValueTo(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="flex flex-row gap-2">
        <div className="flex-1">
          <Input
            type="number"
            placeholder={`Min ${placeholder}`}
            value={valueFrom === null ? "" : valueFrom}
            onChange={handleFromChange}
          />
        </div>
        <div className="flex-1">
          <Input
            type="number"
            placeholder={`Max ${placeholder}`}
            value={valueTo === null ? "" : valueTo}
            onChange={handleToChange}
          />
        </div>
      </div>
    </div>
  );
}
