import { filterFn } from "../utils/customerFilter.ts";
import type { Customer } from "../types/customer.ts";

const customers: Pick<Customer, "city" | "state" | "gender" | "country">[] = [
    {
        gender: "Other",
        country: "Greenland",
        city: "Altamonte Springs",
        state: "Delaware",
    },
    {
        gender: "Male",
        country: "USA",
        city: "New York",
        state: "NY",
    },
];

describe("filterFn", () => {
    test("returns all customers for empty filters", () => {
        const filtered = customers.filter((c) => filterFn(c, {}));
        expect(filtered).toEqual(customers);
    });

    test("filters by country", () => {
        const filtered = customers.filter((c) =>
            filterFn(c, { country: "Greenland" })
        );
        expect(filtered).toEqual([customers[0]]);
    });

    test("filters by city and gender", () => {
        const filtered = customers.filter((c) =>
            filterFn(c, { city: "New York", gender: "Male" })
        );
        expect(filtered).toEqual([customers[1]]);
    });

    test("returns empty array when no match", () => {
        const filtered = customers.filter((c) =>
            filterFn(c, { country: "Canada" })
        );
        expect(filtered).toEqual([]);
    });

    test("ignores empty string or undefined filters", () => {
        const filtered = customers.filter((c) =>
            filterFn(c, { country: "", gender: undefined })
        );
        expect(filtered).toEqual(customers);
    });

    test("is case-insensitive", () => {
        const filtered = customers.filter((c) =>
            filterFn(c, { city: "altamonte springs" })
        );
        expect(filtered).toEqual([customers[0]]);
    });
});
