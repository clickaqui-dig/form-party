"use client";

import { ErrorMessage, Field, FieldProps } from "formik";
import Input from "../input/InputField";
import Label from "../Label";
import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "@/icons";


export const FormSignin = () => {    
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <>
            <div>
                <Label htmlFor="email">
                    Email <span className="text-error-500">*</span>{" "}
                </Label>
                <Field id="email" name="email"
                    render={({ field }: FieldProps) => (
                        <Input
                            {...field}
                            type="text"
                            placeholder="info@gmail.com"
                        />
                    )} />
                <ErrorMessage name="email" component="div" />
            </div>
            <div>
                <Label htmlFor="password">
                    Password <span className="text-error-500">*</span>{" "}
                </Label>
                <div className="relative">
                    <Field id="password" name="password" 
                        render={({ field }: FieldProps) => (
                            <Input 
                                {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                    />
                        )} />
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
                </div>
            </div>
        </>
    )
}