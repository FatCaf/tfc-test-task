import { type FC } from "react";
import type { Order } from "../../../../types/order";
import { OrderCard } from "./OrderCard";
import { LazyRender } from "../../../../components/LazyRender.tsx";
import { Sorter } from "../../../../components/Sorter.tsx";
import { useSort } from "../../../../hooks/useSort.ts";

type OrdersListProps = {
    orders: Order[];
};

const orderFields: { value: keyof Order; label: string }[] = [
    { value: "price", label: "Price" },
    { value: "createdAt", label: "Ordered" },
    { value: "shippedAt", label: "Shipped" },
];

export const OrdersList: FC<OrdersListProps> = ({ orders }) => {
    const {
        field,
        direction,
        setSort,
        toggleDirection,
        clearSort,
        sortedData,
    } = useSort(orders, "orderSort");
    if (!orders.length) return <p>No orders found.</p>;

    return (
        <>
            <Sorter<Order>
                fields={orderFields}
                field={field}
                direction={direction}
                onChangeField={setSort}
                onToggleDirection={toggleDirection}
                onClear={clearSort}
            />
            <div className="flex flex-col">
                {sortedData.map((order) => (
                    <LazyRender key={order.number}>
                        <OrderCard order={order} />
                    </LazyRender>
                ))}
            </div>
        </>
    );
};
