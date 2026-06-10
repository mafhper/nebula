import { useState } from 'react';

import { parseColor, toHexFrom, toHslFrom, toHslString } from '../color';

interface ColorFieldProps {
  label: string;
  /** Current colour in any accepted format (hex / rgb() / hsl()). */
  value: string;
  /** Always emits a canonical hsl() string. */
  onChange: (hsl: string) => void;
  /** Optional caption under the label (e.g. "From preset"). */
  meta?: string;
  /** When provided, shows a reset affordance. */
  onReset?: () => void;
}

export function ColorField({ label, value, onChange, meta, onReset }: ColorFieldProps) {
  const hsl = toHslFrom(value);
  const hex = toHexFrom(value);
  // While not editing we render the canonical `hsl` derived from props, so the
  // draft only needs to exist during an edit — no effect-based sync required.
  const [draft, setDraft] = useState(hsl);
  const [editing, setEditing] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const commit = (raw: string) => {
    const rgb = parseColor(raw);
    setEditing(false);
    if (rgb) {
      setInvalid(false);
      onChange(toHslString(rgb));
    } else {
      setInvalid(true);
      setDraft(hsl);
    }
  };

  return (
    <div className="color-field">
      <label className="color-swatch">
        <span className="color-swatch-fill" style={{ background: hex }} />
        <input
          type="color"
          value={hex}
          onChange={(event) => onChange(toHslFrom(event.target.value))}
          aria-label={`${label} colour picker`}
        />
      </label>

      <div className="color-field-body">
        <span className="color-field-head">
          <span className="color-field-label">{label}</span>
          {meta ? <span className="color-field-meta">{meta}</span> : null}
          {onReset ? (
            <button type="button" className="color-field-reset" onClick={onReset}>
              Reset
            </button>
          ) : null}
        </span>
        <input
          className={`color-field-input${invalid ? ' is-invalid' : ''}`}
          type="text"
          spellCheck={false}
          autoComplete="off"
          value={editing ? draft : hsl}
          onFocus={() => {
            setEditing(true);
            setInvalid(false);
            setDraft(hsl);
          }}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={(event) => commit(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') event.currentTarget.blur();
            if (event.key === 'Escape') {
              setDraft(hsl);
              setInvalid(false);
              event.currentTarget.blur();
            }
          }}
          aria-label={`${label} value — accepts HSL, hex or RGB`}
        />
      </div>
    </div>
  );
}
