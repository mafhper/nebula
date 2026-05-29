interface RangeControlProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export function RangeControl({ label, min, max, step, value, onChange }: RangeControlProps) {
  return (
    <label>
      <span>
        {label}
        <output>{Number.isInteger(value) ? value : value.toFixed(2)}</output>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
