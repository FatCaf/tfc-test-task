import type { FC } from "react";
import type { Customer as CustomerType } from "../../../types/customer.ts";
import user from "../../../../public/user.png";

type CustomerProps = Pick<CustomerType, "firstName" | "lastName" | "email"> & {
    style?: React.CSSProperties;
};

export const Customer: FC<CustomerProps> = ({
    firstName,
    lastName,
    email,
    style = {},
}) => (
    <div
        className="flex items-center justify-between w-full p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        style={style}
    >
        <div>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                {firstName} {lastName}
            </p>
            <p className="text-sm sm:text-base text-gray-500">{email}</p>
        </div>
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-gray-300">
            <img
                src={user}
                alt="avatar"
                className="w-full h-full object-cover"
            />
        </div>
    </div>
);
