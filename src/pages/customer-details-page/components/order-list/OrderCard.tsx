import type { FC } from "react";
import type { Order } from "../../../../types/order";
import { Formatter } from "../../../../utils/Formatter.ts";

type OrderCardProps = {
    order: Order;
};

const formatter = new Formatter();

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
    return (
        <div className="flex justify-between p-4 border rounded-lg shadow-sm mb-2 bg-white">
            <div>
                <p className="font-semibold">{order.itemName}</p>
                <p className="text-sm text-gray-500">
                    Qty: {order.amount} | Order #: {order.number}
                </p>
            </div>
            <div className="text-right">
                <p>{formatter.formatCurrency(order.price, order.currency)}</p>
                <p className="text-sm text-gray-500">
                    Ordered: {formatter.formatDate(order.createdAt)}
                </p>
                <p className="text-sm text-gray-500">
                    Shipped: {formatter.formatDate(order.shippedAt)}
                </p>
            </div>
        </div>
    );
};
