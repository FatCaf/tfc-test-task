import { useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

export type SortDirection = "asc" | "desc";

export const useSort = <T extends Record<string, string | number>>(
    data: T[],
    key = "sort"
) => {
    const [params, setParams] = useSearchParams();
    const [storedSort, setStoredSort] = useLocalStorage<{
        field?: keyof T;
        direction?: SortDirection;
    }>({ key });

    const field = (params.get("field") as keyof T) ?? storedSort?.field;
    const direction =
        (params.get("direction") as SortDirection) ??
        storedSort?.direction ??
        "asc";

    const setSort = useCallback(
        (newField: keyof T, newDirection: SortDirection) => {
            const updated = { field: newField, direction: newDirection };
            setStoredSort(JSON.stringify(updated));
            setParams(updated as Record<string, string>, { replace: true });
        },
        [setStoredSort, setParams]
    );

    const toggleDirection = useCallback(() => {
        if (!field) return;
        setSort(field, direction === "asc" ? "desc" : "asc");
    }, [field, direction, setSort]);

    const clearSort = useCallback(() => {
        setStoredSort(JSON.stringify({}));
        setParams({}, { replace: true });
    }, [setStoredSort, setParams]);

    const sortedData = useMemo(() => {
        if (!field) return data;
        return [...data].sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];

            if (typeof aValue === "number" && typeof bValue === "number") {
                return direction === "asc" ? aValue - bValue : bValue - aValue;
            }

            const aStr = aValue?.toString().toLowerCase() ?? "";
            const bStr = bValue?.toString().toLowerCase() ?? "";
            if (aStr < bStr) return direction === "asc" ? -1 : 1;
            if (aStr > bStr) return direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, field, direction]);

    useEffect(() => {
        if (
            (!params.get("field") && storedSort?.field) ||
            (!params.get("direction") && storedSort?.direction)
        ) {
            const updated: Record<string, string> = {};
            if (storedSort?.field) updated.field = storedSort.field as string;
            if (storedSort?.direction) updated.direction = storedSort.direction;
            setParams(updated, { replace: true });
        }
    }, [params, storedSort, setParams]);

    return {
        field,
        direction,
        setSort,
        toggleDirection,
        clearSort,
        sortedData,
    };
};
