import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { cleanFilters } from "../utils/cleanFilters.ts";

export const useFilter = <T, F extends Record<string, string>>(
    key: string,
    data: T[],
    filterFn: (item: T, filters: F) => boolean
) => {
    const [params, setParams] = useSearchParams();
    const [storedFilters, setStoredFilters] = useLocalStorage<F>({
        key,
    });

    const mergedFilters: F = useMemo(() => {
        return {
            ...storedFilters,
            ...Object.fromEntries(params.entries()),
        } as F;
    }, [params, storedFilters]);

    const setFilters = useCallback(
        (newFilters: F) => {
            const updatedFilters = cleanFilters<F>({
                ...mergedFilters,
                ...newFilters,
            });
            const search = new URLSearchParams(
                updatedFilters as Record<string, string>
            );
            setParams(search, { replace: true });
            setStoredFilters(JSON.stringify(updatedFilters));
        },
        [mergedFilters, setParams, setStoredFilters]
    );

    const resetFilters = () => {
        setParams({});
        setStoredFilters(JSON.stringify({}));
    };

    useEffect(() => {
        if (
            [...params.keys()].length === 0 &&
            Object.keys(storedFilters).length > 0
        ) {
            const search = new URLSearchParams(
                storedFilters as Record<string, string>
            );
            setParams(search, { replace: true });
        }
    }, [params, storedFilters, setParams]);

    const filteredData = useMemo(() => {
        return data.filter((item) => filterFn(item, mergedFilters));
    }, [data, mergedFilters, filterFn]);

    return [mergedFilters, setFilters, resetFilters, filteredData] as const;
};
