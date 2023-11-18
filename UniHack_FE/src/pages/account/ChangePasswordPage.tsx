import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";

import { Layout } from "components/UI/Layout";
import { Input } from "components/UI/Inputs/Input";
import { Button } from "components/UI/Interactables/Button";
import { Dictionary } from "environment";
import { useChangePassword, useLogout, useNavigation } from "hooks";
import { InputType } from "types";

const VALIDATION_SCHEMA = yup.object().shape({
  currentPassword: yup
    .string()
    .required(Dictionary.account.resetPassword.current.required),
  newPassword: yup
    .string()
    .required(Dictionary.account.resetPassword.new.required)
    .min(8, Dictionary.account.resetPassword.new.min),
  repeatPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword")],
      Dictionary.account.resetPassword.repeat.match
    )
    .required(Dictionary.account.resetPassword.repeat.required),
});

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
  username: string;
}

interface Props {
  username: string;
}

export function ChangePassword({ username }: Props) {
  const [{ data: passwordHasChanged }, changePassword] = useChangePassword();
  const logout = useLogout();
  const { routes, navigate, replace } = useNavigation();

  const {
    errors,
    isValid,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik<ChangePasswordFormValues>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
      username: "",
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: ({ currentPassword, newPassword, repeatPassword }) =>
      changePassword({
        old_password: currentPassword,
        new_password1: newPassword,
        new_password2: repeatPassword,
        username: username,
      }),
  });

  useEffect(() => {
    if (passwordHasChanged) {
      logout();
      replace(routes.passwordChanged);
    }
  }, [passwordHasChanged]);

  return (
    <Layout.Column flex={1} justify="flex-start" margin={{ top: 2.5 }}>
      <Input
        error={touched.currentPassword ? errors.currentPassword : undefined}
        label={Dictionary.account.resetPassword.current.label}
        // margin={{ bottom: 2 }}
        name="currentPassword"
        placeholder={Dictionary.account.resetPassword.current.placeholder}
        type={InputType.Password}
        value={values.currentPassword}
        // width={48}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Input
        error={touched.newPassword ? errors.newPassword : undefined}
        label={Dictionary.account.resetPassword.new.label}
        // margin={{ bottom: 2 }}
        name="newPassword"
        placeholder={Dictionary.account.resetPassword.new.placeholder}
        type={InputType.Password}
        value={values.newPassword}
        // width={48}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Input
        error={touched.repeatPassword ? errors.repeatPassword : undefined}
        label={Dictionary.account.resetPassword.repeat.label}
        // margin={{ bottom: 4 }}
        name="repeatPassword"
        placeholder={Dictionary.account.resetPassword.repeat.placeholder}
        type={InputType.Password}
        value={values.repeatPassword}
        // width={48}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Layout.Row width={48}>
        <Button
          disabled={!isValid}
          width={23}
          onClick={handleSubmit}
          title={Dictionary.account.resetPassword.submit}
        ></Button>
      </Layout.Row>
    </Layout.Column>
  );
}
