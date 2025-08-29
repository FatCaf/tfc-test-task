import type { FilterOptions } from "../types/filterOptions.ts";
import type { Customer } from "../types/customer.ts";

export const filterFn = (
    customer: Pick<Customer, "gender" | "city" | "country" | "state">,
    filters: FilterOptions
) => {
    return (Object.entries(filters) as [keyof FilterOptions, string][]).every(
        ([key, value]) => {
            if (!value) return true;

            const customerValue = (customer[key] ?? "")
                .toString()
                .toLowerCase();
            const filterValue = value.toLowerCase();

            if (key === "gender") {
                return customerValue === filterValue;
            }

            return customerValue.includes(filterValue);
        }
    );
};
