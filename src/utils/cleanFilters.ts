export const cleanFilters = <T extends Record<string, string>>(
    filters: T
): Partial<T> => {
    return Object.fromEntries(
        Object.entries(filters).filter(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_, value]) => value !== undefined && value !== ""
        )
    ) as Partial<T>;
};
