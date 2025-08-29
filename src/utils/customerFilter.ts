import type { FilterOptions } from "../types/filterOptions.ts";
import type { Customer } from "../types/customer.ts";

export const filterFn = (
    customer: Pick<Customer, "gender" | "city" | "country" | "state">,
    filters: FilterOptions
) => {
    return (Object.entries(filters) as [keyof FilterOptions, string][]).every(
        ([key, value]) => {
            if (!value) return true;
            return (customer[key] ?? "")
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase());
        }
    );
};
