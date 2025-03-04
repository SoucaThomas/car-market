import { useEffect } from "react";
import { CommandSelector } from "./CommandSelector";
import { Label } from "./label";

interface FilterInputProps<T extends { id: number; label: string }> {
  label: string;
  data: T[];
  value: T | null;
  setValue: (value: T | null) => void;
  defaultValue?: T;
}

export function FilterInput({
  label,
  data,
  value,
  setValue,
  defaultValue,
}: FilterInputProps<{ id: number; label: string }>) {
  useEffect(() => {
    if (defaultValue && value === null) {
      setValue(defaultValue);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <CommandSelector
        data={data}
        text={label.toLowerCase()}
        value={value}
        setValue={setValue}
      />
    </div>
  );
}
