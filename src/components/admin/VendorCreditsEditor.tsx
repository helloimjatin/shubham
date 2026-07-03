"use client";

interface VendorCreditsEditorProps {
  value: Record<string, string>;
  onChange: (credits: Record<string, string>) => void;
}

export function VendorCreditsEditor({
  value,
  onChange,
}: VendorCreditsEditorProps) {
  const entries = Object.entries(value);

  const updateKey = (oldKey: string, newKey: string, val: string) => {
    const next = { ...value };
    delete next[oldKey];
    if (newKey) next[newKey] = val;
    onChange(next);
  };

  const updateValue = (key: string, val: string) => {
    onChange({ ...value, [key]: val });
  };

  const addEntry = () => {
    const key = `Vendor ${entries.length + 1}`;
    onChange({ ...value, [key]: "" });
  };

  const removeEntry = (key: string) => {
    const next = { ...value };
    delete next[key];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Vendor Credits</p>
      {entries.map(([key, val]) => (
        <div key={key} className="flex gap-2">
          <input
            type="text"
            value={key}
            onChange={(e) => updateKey(key, e.target.value, val)}
            placeholder="Role"
            className="flex-1 border border-border px-3 py-2 text-sm"
          />
          <input
            type="text"
            value={val}
            onChange={(e) => updateValue(key, e.target.value)}
            placeholder="Name"
            className="flex-1 border border-border px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => removeEntry(key)}
            className="px-3 text-red-600 text-sm"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addEntry}
        className="text-sm text-accent hover:underline"
      >
        + Add vendor
      </button>
    </div>
  );
}
