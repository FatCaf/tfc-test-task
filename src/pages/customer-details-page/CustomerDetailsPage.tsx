import { OrdersList } from "./components/order-list/OrderList.tsx";
import orders from "../../orders.json";
import type { Customer } from "../../types/customer.ts";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import customers from "../../customers.json";

export const CustomerDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate("/", { replace: true });
            return;
        }
        const found = customers[Number(id)];
        if (found) setCustomer(found);
    }, [id]);

    if (!customer) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {customer.firstName} {customer.lastName}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-600 font-semibold">Email</p>
                        <p className="text-gray-800">{customer.email}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 font-semibold">Gender</p>
                        <p className="text-gray-800">{customer.gender}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 font-semibold">Country</p>
                        <p className="text-gray-800">{customer.country}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 font-semibold">State</p>
                        <p className="text-gray-800">{customer.state}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 font-semibold">City</p>
                        <p className="text-gray-800">{customer.city}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 font-semibold">Post Code</p>
                        <p className="text-gray-800">{customer.postCode}</p>
                    </div>
                    <div className="sm:col-span-2">
                        <p className="text-gray-600 font-semibold">Address</p>
                        <p className="text-gray-800">
                            {customer.street} {customer.streetNumber}
                        </p>
                    </div>
                </div>
            </div>
            <OrdersList orders={orders} />
        </div>
    );
};
