import { Customer } from "./Customer.tsx";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll.ts";
import { AutoSizer, InfiniteLoader, List } from "react-virtualized";
import type { Customer as CustomerType } from "../../../types/customer.ts";
import { useNavigate } from "react-router";

export const CustomerList = ({ customers }: { customers: CustomerType[] }) => {
    const navigate = useNavigate();

    const { itemsToDisplay, isRowLoaded, loadMoreRows, totalItems } =
        useInfiniteScroll(customers, 20);

    const rowRenderer = ({
        index,
        key,
        style,
    }: {
        index: number;
        key: string;
        style: React.CSSProperties;
    }) => {
        const customer = itemsToDisplay[index];
        if (!customer) return null;
        return (
            <Customer
                key={key}
                style={style}
                firstName={customer.firstName}
                lastName={customer.lastName}
                email={customer.email}
                onClick={() => navigate(`/customer/${index}`)}
            />
        );
    };

    return (
        <div className="h-[500px] flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="h-full max-w-[448px] w-full">
                <AutoSizer>
                    {({ height, width }) => {
                        return (
                            <InfiniteLoader
                                isRowLoaded={isRowLoaded}
                                loadMoreRows={loadMoreRows}
                                rowCount={totalItems}
                                threshold={5}
                            >
                                {({ onRowsRendered, registerChild }) => (
                                    <List
                                        height={height}
                                        width={width}
                                        rowHeight={80}
                                        rowCount={itemsToDisplay.length}
                                        rowRenderer={rowRenderer}
                                        onRowsRendered={onRowsRendered}
                                        ref={registerChild}
                                    />
                                )}
                            </InfiniteLoader>
                        );
                    }}
                </AutoSizer>
            </div>
        </div>
    );
};
