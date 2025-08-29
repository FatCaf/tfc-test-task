import type { FC } from "react";
import type { Customer as CustomerType } from "../../../types/customer.ts";
import user from "../../../../public/user.png";

type CustomerProps = Pick<CustomerType, "firstName" | "lastName" | "email"> & {
    style?: React.CSSProperties;
    onClick?: () => void;
};

export const Customer: FC<CustomerProps> = ({
    firstName,
    lastName,
    email,
    onClick,
    style = {},
}) => (
    <div
        className="flex items-center justify-between w-full p-4 border rounded-lg cursor-pointer bg-white sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        style={style}
        onClick={onClick}
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
