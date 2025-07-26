import { ErrorMessage, Field } from "formik";
import Label from "../Label";
import { EmailInput, PasswordInput } from "./fields";


export const FormSignin = () => {
    return (
        <>
            <div>
                <Label htmlFor="email">
                    Email <span className="text-error-500">*</span>{" "}
                </Label>
                <Field id="email" name="email" component={EmailInput} />
                <ErrorMessage name="email" component="div" />
            </div>
            <div>
                <Label htmlFor="password">
                    Password <span className="text-error-500">*</span>{" "}
                </Label>
                <div className="relative">
                    <Field id="password" name="password" component={PasswordInput} />
                </div>
            </div>
        </>
    )
}