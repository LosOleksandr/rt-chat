import { ErrorMessage } from "@hookform/error-message";
import React, { FC, SyntheticEvent, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type TInput = React.InputHTMLAttributes<HTMLInputElement> & {
  // eslint-disable-next-line no-unused-vars
  onChange: (e: SyntheticEvent) => void;
  // eslint-disable-next-line no-unused-vars
  onBlur: (e: SyntheticEvent) => void;
  label?: string;
  errors?: FieldErrors;
};

export const Input: FC<TInput> = forwardRef(
  (
    { onBlur, onChange, label, errors, ...props },
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <label>
        {label}
        <input
          className="text-white block w-full bg-transparent border border-white rounded-sm mt-2"
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        <ErrorMessage
          as={"small"}
          className="text-rose-400 block mt-2"
          name={props.name || ""}
          errors={errors}
        />
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
