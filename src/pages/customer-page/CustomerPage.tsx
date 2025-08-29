import { CustomerFilters } from "./components/CustomerFilters.tsx";
import { CustomerList } from "./components/CustomerList.tsx";
import { useFilter } from "../../hooks/useFilter.ts";
import type { Customer } from "../../types/customer.ts";
import type { FilterOptions } from "../../types/filterOptions.ts";
import customers from "../../customers.json";
import { filterFn } from "../../utils/customerFilter.ts";

export const CustomerPage = () => {
    const [filters, setFilters, resetFilters, filteredCustomers] = useFilter<
        Customer,
        FilterOptions
    >("customerFilters", customers, filterFn);

    return (
        <>
            <CustomerFilters
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
            />
            <CustomerList customers={filteredCustomers} />
        </>
    );
};
