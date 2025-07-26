import { FieldProps } from "formik";
import Input from "../input/InputField";
import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "@/icons";

export const EmailInput = ({ field }: FieldProps) => (
    <>
        <Input
            {...field}
            type="text"
            placeholder="info@gmail.com"
        />
    </>
);

export const PasswordInput = ({ field }: FieldProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <>
            <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
            />
            <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
                {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                )}
            </span>
        </>
    )
}