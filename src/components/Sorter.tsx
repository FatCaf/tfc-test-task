export type SortDirection = "asc" | "desc";

type SorterProps<T extends object> = {
    fields: { value: keyof T; label: string }[];
    field: keyof T | null;
    direction: SortDirection;
    onChangeField: (field: keyof T, direction: SortDirection) => void;
    onToggleDirection: () => void;
    onClear: () => void;
};

export const Sorter = <T extends object>({
    fields,
    field,
    direction,
    onChangeField,
    onToggleDirection,
    onClear,
}: SorterProps<T>) => (
    <div>
        <select
            value={field ? String(field) : ""}
            onChange={(e) =>
                onChangeField(e.target.value as keyof T, direction)
            }
            className="border rounded px-2 py-1"
        >
            <option value="" disabled>
                Select field
            </option>
            {fields.map((f) => (
                <option key={String(f.value)} value={String(f.value)}>
                    {f.label}
                </option>
            ))}
        </select>

        <button
            onClick={onToggleDirection}
            disabled={!field}
            className="border rounded px-2 py-1 bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
        >
            {direction === "asc" ? "Ascending ↑" : "Descending ↓"}
        </button>

        <button
            onClick={onClear}
            disabled={!field}
            className="border rounded px-2 py-1 bg-red-100 hover:bg-red-200 transition disabled:opacity-50"
        >
            Clear
        </button>
    </div>
);
