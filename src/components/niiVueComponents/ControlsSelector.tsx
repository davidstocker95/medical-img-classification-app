import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

type ControlSelectorProps<T extends string> = {
  label: string;
  value: T;
  onChange: (val: T) => void;
  options: T[];
};

/**
 * ControlSelector
 *
 * Generic dropdown component for selecting values (e.g., slice type, color map).
 *
 * Features/Responsibilities:
 * - Renders a labeled select input with options
 * - Updates selected value using callback
 * - Prevents drag interference on interaction
 *
 * Props:
 * @param {string} label - Label for the dropdown control
 * @param {T} value - Currently selected option
 * @param {(val: T) => void} onChange - Callback to update selection
 * @param {T[]} options - List of selectable values
 *
 * Events:
 * - onChange: Updates value via `onChange` callback
 * - onMouseDown: Stops event propagation to prevent dragging interference
 *
 * Notes:
 * - Generic over string literals to support strongly typed values
 */
export const ControlSelector = <T extends string>({
  label,
  value,
  onChange,
  options,
}: ControlSelectorProps<T>) => (
  <FormControl size="small" fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      onMouseDown={(e) => e.stopPropagation()}
      label={label}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
