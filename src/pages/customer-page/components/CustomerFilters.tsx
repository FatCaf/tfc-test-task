import type { FC } from "react";
import type { FilterOptions } from "../../../types/filterOptions.ts";

const genderOptions = ["Male", "Female", "Other", "Fluid"];
type CustomerFiltersProps = {
    filters: FilterOptions;
    setFilters: (filters: FilterOptions) => void;
    resetFilters: () => void;
};

export const CustomerFilters: FC<CustomerFiltersProps> = ({
    filters,
    setFilters,
    resetFilters,
}) => {
    const handleChange = (field: keyof FilterOptions, value: string) => {
        setFilters({ [field]: value || undefined });
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-2xl space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Country
                </label>
                <input
                    type="text"
                    value={filters.country ?? ""}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter country"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    State
                </label>
                <input
                    type="text"
                    value={filters.state ?? ""}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter state"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    City
                </label>
                <input
                    type="text"
                    value={filters.city ?? ""}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter city"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Gender
                </label>
                <select
                    value={filters.gender ?? ""}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="">Select gender</option>
                    {genderOptions.map((g) => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={resetFilters}
                className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            >
                Reset Filters
            </button>
        </div>
    );
};
