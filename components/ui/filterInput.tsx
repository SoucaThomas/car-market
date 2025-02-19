import { CommandSelector } from "./CommandSelector";
import { Label } from "./label";

interface FilterInputProps<T extends Record<number, string>> {
  label: string;
  data: T[];
  value: T;
  setValue: (v: T) => void;
}

export function FilterInput({
  label,
  data,
  value,
  setValue,
}: FilterInputProps<{ id: number; label: string }>) {
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
