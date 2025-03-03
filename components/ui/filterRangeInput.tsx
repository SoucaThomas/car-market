import { Input } from "./input";
import { Label } from "./label";
import { useState } from "react";

interface FilterRangeInputProps {
  label: string;
  setValueFrom: (v: number) => void;
  setValueTo: (v: number) => void;
}
export function FilterRangeInput({
  label,
  setValueFrom,
  setValueTo,
}: FilterRangeInputProps) {
  const [valueFrom, setValueFromState] = useState(0);
  const [valueTo, setValueToState] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <div className="felx-row flex gap-2">
        <div>
          <Label>{label} from</Label>
          <Input
            type="number"
            placeholder={`${label} from`}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setValueFromState(value);
              setValueFrom(value);
            }}
          />
        </div>
        <div>
          <Label>{label} to</Label>
          <Input
            type="number"
            placeholder={`${label} to`}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setValueToState(value);
              setValueTo(value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
