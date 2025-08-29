import { useCallback, useEffect } from "react";

import { useForceUpdate } from "./useForceUpdate";
import type { LocalStorage } from "../types/localStorage.ts";

type LocalStorageUpdate = string | ((prev: string | null) => string);

export const useLocalStorage = <T>({ key }: LocalStorage) => {
    const forceUpdate = useForceUpdate();

    const storedValue = localStorage.getItem(key);

    const setValue = useCallback(
        (update: LocalStorageUpdate) => {
            const currentValue = localStorage.getItem(key);
            const value =
                typeof update === "function" ? update(currentValue) : update;

            if (value !== currentValue) {
                localStorage.setItem(key, value);
                forceUpdate();
            }
        },
        [key, forceUpdate]
    );

    useEffect(() => {
        window.addEventListener("storage", forceUpdate);
        return () => window.removeEventListener("storage", forceUpdate);
    }, [forceUpdate]);

    return [JSON.parse(storedValue ?? "{}") as T, setValue] as const;
};
