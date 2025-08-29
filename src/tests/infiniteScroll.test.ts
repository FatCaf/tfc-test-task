import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useVirtualizedInfiniteScroll from "../hooks/useInfiniteScroll.ts";
import type { Customer } from "../types/customer.ts";

const mockCustomers: Customer[] = Array.from({ length: 50 }).map((_, i) => ({
    firstName: `First${i}`,
    lastName: `Last${i}`,
    email: `user${i}@example.com`,
    gender: "Other",
    country: "Country",
    city: "City",
    state: "State",
    postCode: "0000",
    street: "Street",
    streetNumber: "1",
}));

describe("useVirtualizedInfiniteScroll", () => {
    it("initializes with the first batch", () => {
        const { result } = renderHook(() =>
            useVirtualizedInfiniteScroll(mockCustomers, 20)
        );

        expect(result.current.itemsToDisplay).toHaveLength(20);
        expect(result.current.totalItems).toBe(50);
    });

    it("loads more rows correctly", async () => {
        const { result } = renderHook(() =>
            useVirtualizedInfiniteScroll(mockCustomers, 20)
        );

        expect(result.current.itemsToDisplay).toHaveLength(20);

        await act(async () => {
            await result.current.loadMoreRows({ startIndex: 20 });
        });

        expect(result.current.itemsToDisplay).toHaveLength(40);

        await act(async () => {
            await result.current.loadMoreRows({ startIndex: 40 });
        });

        expect(result.current.itemsToDisplay).toHaveLength(50);

        await act(async () => {
            await result.current.loadMoreRows({ startIndex: 60 });
        });

        expect(result.current.itemsToDisplay).toHaveLength(50);
    });

    it("isRowLoaded returns true/false correctly", () => {
        const { result } = renderHook(() =>
            useVirtualizedInfiniteScroll(mockCustomers, 20)
        );

        expect(result.current.isRowLoaded({ index: 10 })).toBe(true);
        expect(result.current.isRowLoaded({ index: 25 })).toBe(false);
    });
});
