import {
    forwardRef,
    type ButtonHTMLAttributes,
    type Ref,
} from "react";
import clsx from "clsx";

/* --- Tipos auxiliares ------------------------- */
type Variant = "ghost" | "solid";
type Size = "icon" | "sm" | "md";

/* --- Interface de propriedades ---------------- */
export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

/* --- Implementação ---------------------------- */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "ghost",
            size = "icon",
            disabled = false,
            className,
            children,
            ...props
        },
        ref: Ref<HTMLButtonElement>,
    ) => {
        const base =
            "inline-flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors";

        const variants: Record<Variant, string> = {
            ghost: "bg-transparent hover:bg-gray-200 focus:ring-gray-400",
            solid: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
        };

        const sizes: Record<Size, string> = {
            icon: "h-8 w-8",
            sm: "h-8 px-3 text-sm",
            md: "h-10 px-4",
        };

        return (
            <button
                ref={ref}
                disabled={disabled}
                className={clsx(base, variants[variant], sizes[size], className)}
                {...props}
            >
                {children}
            </button>
        );
    },
);

// boa prática para depuração e DevTools
Button.displayName = "Button";
