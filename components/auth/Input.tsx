import { TSignupCreds } from "@/types/auth";
import { ErrorMessage } from "@hookform/error-message";
import React, { FC, SyntheticEvent, forwardRef, useState } from "react";
import { FieldErrors } from "react-hook-form";
import { Button } from "../ui/button";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { Textarea } from "../ui/textarea";

type TInput = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  as: "input" | "textarea";
  onChange: (e: SyntheticEvent) => void;
  onBlur: (e: SyntheticEvent) => void;
  label?: string;
  errors?: FieldErrors;
};

export const Input: FC<TInput> = forwardRef(
  (
    { as, onBlur, onChange, label, errors, ...props },
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
                className={`block w-full bg-transparent border-2 border-border  focus:border-accent outline-none rounded-md p-1 mt-1 transition-colors ${
                  errors?.[props.name as keyof TSignupCreds] || errors?.root
                    ? "border-danger focus:border-red-600 animate-shaking"
                    : ""
                }`}
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
                  className="absolute top-0 right-0"
                  variant={"ghost"}
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
              //@ts-expect-error not-inculded-property
              style={{ fieldSizing: "content" }}
              className={`block w-full bg-transparent dark:bg-transparent border-2 border-border focus:border-accent outline-none rounded-md p-1 mt-1 transition-colors resize-none ${
                errors?.[props.name as keyof TSignupCreds] || errors?.root
                  ? "border-danger focus:border-red-600 animate-shaking"
                  : ""
              }`}
              onBlur={onBlur}
              onChange={onChange}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              {...props}
            />
          )}
        </div>
        <ErrorMessage
          as={"small"}
          className="text-danger block mt-2"
          name={props.name || ""}
          errors={errors}
        />
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
