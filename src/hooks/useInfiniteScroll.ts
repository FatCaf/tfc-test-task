import { useState, useEffect, useCallback } from "react";
import type { Customer } from "../types/customer";

const useVirtualizedInfiniteScroll = (data: Customer[], batchSize = 20) => {
    const [itemsToDisplay, setItemsToDisplay] = useState<Customer[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setItemsToDisplay(data.slice(0, batchSize));
        setCurrentIndex(batchSize);
    }, [data, batchSize]);

    const isRowLoaded = useCallback(
        ({ index }: { index: number }) => index < currentIndex,
        [currentIndex]
    );

    const loadMoreRows = useCallback(
        async ({ startIndex }: { startIndex: number }) => {
            if (startIndex >= data.length) return;

            const nextBatch = data.slice(
                currentIndex,
                Math.min(currentIndex + batchSize, data.length)
            );
            setItemsToDisplay((prev) => [...prev, ...nextBatch]);
            setCurrentIndex((prev) => prev + batchSize);
        },
        [data, currentIndex, batchSize]
    );

    return {
        itemsToDisplay,
        isRowLoaded,
        loadMoreRows,
        totalItems: data.length,
    };
};

export default useVirtualizedInfiniteScroll;
