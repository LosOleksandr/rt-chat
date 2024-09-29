import { TSignupCreds } from "@/types/auth";
import { ErrorMessage } from "@hookform/error-message";
import React, {
  FC,
  InputHTMLAttributes,
  SyntheticEvent,
  forwardRef,
  useState,
} from "react";
import { FieldErrors } from "react-hook-form";
import { Button } from "./button";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { Textarea } from "./textarea";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "block w-full transition-colors bg-transparent dark:bg-transparent p-1 mt-1 outline-none rounded-md border-2 border-border resize-none",
  {
    variants: {
      variant: {
        input:
          "bg-transparent dark:bg-transparent focus:border-accent min-h-max",
        textarea: "min-h-[80px]",
        ghost: "border-0 min-h-max"
      },
    },
    defaultVariants: {
      variant: "input",
    },
  }
);

type TInput = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> &
  VariantProps<typeof inputVariants> & {
    as: "input" | "textarea";
    onChange?: (e: SyntheticEvent) => void;
    onBlur?: (e: SyntheticEvent) => void;
    label?: string;
    errors?: FieldErrors;
    className?: string;
  };

export const Input: FC<TInput> = forwardRef(
  (
    { as, onBlur, onChange, label, errors, className, variant, ...props },
    ref: React.Ref<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <label
        className={`${
          errors?.[props.name as keyof TSignupCreds] || errors?.root
            ? "text-danger"
            : ""
        }`}
      >
        {label}
        <div className="relative">
          {as === "input" && (
            <>
              <input
                className={cn(
                  inputVariants({ variant, className }),
                  `${
                    errors?.[props.name as keyof TSignupCreds] || errors?.root
                      ? "border-danger focus:border-red-600 animate-shaking"
                      : null
                  }`
                )}
                onBlur={onBlur}
                onChange={onChange}
                ref={ref as React.Ref<HTMLInputElement>}
                type={showPassword ? "text" : props.type}
                {...props}
              />
              {props.type === "password" && (
                <Button
                  tabIndex={-1}
                  type="button"
                  className={`absolute top-0 right-0`}
                  variant={
                    errors?.[props.name as keyof TSignupCreds] || errors?.root
                      ? "ghost-destructive"
                      : "ghost"
                  }
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <IconEyeClosed size={24} />
                  ) : (
                    <IconEye size={24} />
                  )}
                </Button>
              )}
            </>
          )}
          {as === "textarea" && (
            <Textarea
              //@ts-expect-error not-included-property
              style={{ fieldSizing: "content" }}
              className={cn(
                inputVariants({ variant, className }),
                `${
                  errors?.[props.name as keyof TSignupCreds] || errors?.root
                    ? "border-danger focus:border-red-600 animate-shaking"
                    : null
                }`
              )}
              onBlur={onBlur}
              onChange={onChange}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              {...props}
            />
          )}
        </div>
        {errors && (
          <ErrorMessage
            as={"small"}
            className="text-danger block mt-2"
            name={props.name || ""}
            errors={errors}
          />
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
