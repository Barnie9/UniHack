import React from "react";

import { Input } from "../Inputs/Input";
import { _Form, FormStyleProps, OptionalField } from "./Form.style";

interface Props extends React.HTMLAttributes<HTMLFormElement>, FormStyleProps {
  children: React.ReactNode;
  className?: string;
}

export function Form({ children, className, onSubmit, ...props }: Props) {
  function handleKeyPress(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter" && onSubmit) {
      e.preventDefault();
      e.stopPropagation();
      onSubmit(e);
    }
  }

  return (
    <_Form
      {...props}
      className={className}
      onKeyPress={handleKeyPress}
      onSubmit={onSubmit}
    >
      {children}
    </_Form>
  );
}

Form.OptionalField = OptionalField;
Form.TextInput = Input;
