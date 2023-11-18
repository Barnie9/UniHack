import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Container, Title, Question, SubmitButton } from "./Signup.style";
import { useNavigation, usePrevious } from "hooks";

import { Layout } from "components/UI/Layout";
import { Typography } from "components/UI/Typography";
// import { TextInput, TypeaheadToggle } from "components/inputs";
// import { Link, Form, CustomDropdown } from "components/widgets";
import { useSignUp } from "hooks";
import { Icon } from "components/UI/Icons";
import { Alerts } from "components/layout";

// const SIGN_UP_VALIDATION_SCHEMA = yup.object().shape({
//   email: yup
//     .string()
//     .required(Dictionary.account.email.required)
//     .email(Dictionary.account.email.invalid),
//   password: yup
//     .string()
//     .required(Dictionary.account.password.required)
//     .min(8, Dictionary.account.password.length)
//     .matches(
//       /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
//       Dictionary.account.password.hint
//     ),
//   confirmPassword: yup
//     .string()
//     .required(Dictionary.account.password.required)
//     .oneOf(
//       [yup.ref("password"), null],
//       Dictionary.account.confirmPassword.noMatch
//     ),
//   username: yup.string().required(Dictionary.account.username.required),
//   firstName: yup.string().required(Dictionary.account.firstName.required),
//   lastName: yup.string().required(Dictionary.account.lastName.required),
//   roleId: yup.number().required(Dictionary.account.roleId.required),
// });

export function Signup() {
  const {
    values,
    errors,
    validateField,
    handleSubmit,
    setFieldValue,
    handleChange,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      roleId: 2,
      password: "",
      confirmPassword: "",
    },
    initialErrors: {},
    validateOnBlur: false,
    validateOnChange: false,
    // validationSchema: SIGN_UP_VALIDATION_SCHEMA,
    onSubmit: ({
      username,
      email,
      firstName,
      lastName,
      roleId,
      password,
      confirmPassword,
    }) => {
      signup({
        username,
        email,
        firstName,
        lastName,
        roleId,
        password1: password,
        password2: confirmPassword,
      });

      return;
    },
  });

  const { routes, navigate } = useNavigation();
  const [{ loading, error }, signup] = useSignUp();

  const prevLoading = usePrevious(loading);

  useEffect(() => {
    if (prevLoading && !loading) {
      if (error?.message) {
        Alerts.error(error.message || "Failed to signup!");
      } else {
        Alerts.success("Account registred successfully!");
        navigate(routes.root);
      }
    }
  }, [loading, prevLoading]);

  function validateOnBlur(field: string) {
    validateField(field);
  }

  function mapRoleIdToString(id: number) {
    if (id === 2) return "Student";
    else if (id === 3) return "Teacher";
  }

  return (
    <Container>
      {/* <Title>
        <Typography.H4 margin={{ bottom: 2.4 }}>
          {Dictionary.auth.signup}
        </Typography.H4>
      </Title>
      <Form maxWidth={40} onSubmit={handleSubmit}>
        <TextInput
          label={Dictionary.account.firstName.label}
          placeholder={Dictionary.account.firstName.placeholder}
          name="firstName"
          required={true}
          value={values.firstName}
          error={errors.firstName}
          type="text"
          onChange={handleChange}
          margin={{ bottom: 1.4 }}
        />
        <TextInput
          label={Dictionary.account.lastName.label}
          placeholder={Dictionary.account.lastName.placeholder}
          name="lastName"
          required={true}
          value={values.lastName}
          error={errors.lastName}
          type="text"
          onChange={handleChange}
          margin={{ bottom: 1.4 }}
        />
        <TextInput
          label={Dictionary.account.username.label}
          placeholder={Dictionary.account.username.placeholder}
          name="username"
          required={true}
          value={values.username}
          error={errors.username}
          type="text"
          onChange={handleChange}
          margin={{ bottom: 1.4 }}
        />
        <TextInput
          label={Dictionary.account.email.label}
          placeholder={Dictionary.account.email.placeholder}
          name="email"
          required={true}
          value={values.email}
          error={errors.email}
          type="text"
          onChange={handleChange}
          margin={{ bottom: 1.4 }}
        />
        <TextInput
          label={Dictionary.account.password.label}
          placeholder={Dictionary.account.password.placeholder}
          name="password"
          required={true}
          value={values.password}
          error={errors.password}
          type="password"
          onChange={handleChange}
          margin={{ bottom: 1.4 }}
        />
        <TextInput
          label={Dictionary.account.confirmPassword.label}
          placeholder={Dictionary.account.confirmPassword.placeholder}
          name="confirmPassword"
          required={true}
          value={values.confirmPassword}
          error={errors.confirmPassword}
          type="password"
          onBlur={() => validateOnBlur("confirmPassword")}
          onChange={handleChange}
          margin={{ bottom: 2.4 }}
        />
        <CustomDropdown
          margin={{ top: 0.4 }}
          menuPosition="right"
          width="100%"
          menuWidth={40}
          toggleComponent={({ ref, onToggle, open }) => (
            <TypeaheadToggle
              clearable={false}
              autoComplete="off"
              onTagRemove={() => undefined}
              placeholder="Role"
              name="roleId"
              toggleRef={ref}
              type="text"
              open={open}
              value={mapRoleIdToString(values.roleId) as string}
              onClick={() => onToggle()}
              icon={<Icon size={3.2} type={(t) => t.ChevronDown} />}
              border={true}
            />
          )}
        >
          <CustomDropdown.Item onClick={() => setFieldValue("roleId", 2)}>
            Student
          </CustomDropdown.Item>
          <CustomDropdown.Item onClick={() => setFieldValue("roleId", 3)}>
            Teacher
          </CustomDropdown.Item>
        </CustomDropdown>
        <SubmitButton onClick={handleSubmit}>
          {Dictionary.terms.signUp}
        </SubmitButton>
      </Form>
      <Question>{Dictionary.account.hasAccount}</Question>
      <Layout.Row justify="center">
        <Link to={routes.root}>{Dictionary.terms.login}</Link>
      </Layout.Row> */}
    </Container>
  );
}
