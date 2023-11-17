import React, { useEffect, useCallback } from "react";
import { isEqual } from "lodash";
import Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  Controller,
  DefaultValues,
  Mode,
  FormProvider,
  FieldValues,
} from "react-hook-form";

import { useEffectOnce, usePrevious } from "hooks";

interface Props<T> {
  // CORE
  mode?: Mode;
  initialValues?: DefaultValues<T>;
  validationSchema?: Yup.ObjectSchema<{}>;
  reValidateMode?: Exclude<Mode, "onTouched" | "all">;
  shouldFocusError?: boolean;
  shouldUnregister?: boolean;
  criteriaMode?: "firstError" | "all";
  // CUSTOMS
  validateOnMount?: boolean;
  enableReinitialize?: boolean;
  registerInitialValues?: boolean;
}

export function useReactForm<T extends FieldValues>({
  // CORE
  mode = "all",
  initialValues,
  validationSchema,
  reValidateMode,
  shouldFocusError,
  shouldUnregister = false, // set `shouldUnregister` to `false` to keep all `initialValues` hence the library removes them if not registered through a `ref` or a `Controller` component
  criteriaMode,
  // CUSTOMS
  validateOnMount,
  enableReinitialize,
  registerInitialValues,
}: Props<T>) {
  const methodsAndState = useForm<T>({
    mode,
    defaultValues: initialValues,
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    reValidateMode,
    shouldFocusError,
    shouldUnregister,
    criteriaMode,
  });

  const { formState, control, ...methods } = methodsAndState;

  const { setValue, trigger, register, reset } = methods;
  const { isSubmitting, isDirty, isValid, dirtyFields, touchedFields, errors } =
    formState;

  // EXCLUDE `isValidating` => CAUSES RE-RENDERS IF DESTRUCTURED
  const parsedFormState = {
    errors,
    isDirty,
    dirtyFields,
    isSubmitting,
    isValid,
    touchedFields,
  };

  useEffectOnce(() => {
    if (validateOnMount) trigger();

    if (registerInitialValues) registerInitialValuesHandler();
  });

  /**
   * Workaround for the RHF library to trigger `isDirty` since `setValue`
   * without a registered component just changes the value and nothing else
   */
  function registerInitialValuesHandler() {
    if (initialValues) {
      Object.keys(initialValues).forEach((key) => register(key as any));
    }
  }

  // reinitialize the entire form each time `initialValues` change
  const prevValues = usePrevious(initialValues);
  useEffect(() => {
    if (
      enableReinitialize &&
      prevValues &&
      !isEqual(prevValues, initialValues)
    ) {
      reset(initialValues);
      if (registerInitialValues) registerInitialValuesHandler();
    }
  }, [initialValues]);

  const handleTrimOnBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setValue(name as any, value.trim() as any);
    },
    []
  );

  const isDirtyAndValid = isDirty && isValid;

  return {
    // CORE
    Controller,
    control,
    ...parsedFormState,
    ...methods,
    // CUSTOMS
    Form,
    FormProvider,
    handleTrimOnBlur,
    formProviderProps: methodsAndState,
    isDirtyAndValid,
  };
}

interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
}

function Form({ children, onSubmit }: FormProps) {
  // HTML form component to wrap the entire submit logic into singular source of truth

  return (
    <form onSubmit={onSubmit}>
      {/* 
				workaround to enable validation on "Enter" key press for: `focusToFirstError`, `triggerErrors`
				validation is disabled if the <button type="submit"> has `disabled` prop set to true 
			*/}
      <button type="submit" style={{ display: "none" }}></button>
      {children}
    </form>
  );
}
