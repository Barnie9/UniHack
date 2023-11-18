import React, { useEffect, useState } from "react";
import { FormikErrors, useFormik } from "formik";

import {
  Container,
  SubmitButton,
  Question,
  EyeIcon,
  Image,
  Title,
} from "./Login.style";
import { Alerts } from "components/layout";
import { InputType } from "types";

import * as yup from "yup";
import { Layout } from "components/UI/Layout";
import { Typography } from "components/UI/Typography";
import { Form } from "components/UI/Form";
import { Dictionary, Images, Svgs } from "environment";
import { Link } from "components/UI/Link";
import { useNavigation, useLogin, usePrevious } from "hooks";
import { Flex } from "components/UI/Flex";
import { useMediaQuery } from "hooks";
import { MediaQueriesDevices } from "environment/theme/Sizes";
// import logo from "environment/assets/images/logo.png";

const validationSchema = yup.object().shape({
  username: yup.string().required(Dictionary.auth.username.required),
  password: yup.string().required(Dictionary.auth.password.required),
});

interface FormValues {
  username: string;
  password: string;
}

export function Login() {
  const {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isValid,
    dirty,
  } = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors: FormikErrors<FormValues> = {};

      return errors;
    },
    validationSchema,
    onSubmit: (values) => {
      login({
        username: values.username,
        password: values.password,
      });
    },
  });

  const { routes } = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [{ loading, error }, login] = useLogin();
  const isPhone = useMediaQuery(MediaQueriesDevices.phone);

  const prevLoading = usePrevious(loading);

  useEffect(() => {
    if (prevLoading && !loading) {
      if (error?.message) {
        Alerts.error(error.message || "Failed to login!");
        console.log(error);
      }
    }
  }, [loading, prevLoading]);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }
  return (
    <Container>
      <Flex>
        {!isPhone && <Image src={Images.loginImage} alt="Login" />}
        <Flex column>
          <Form maxWidth={40} onSubmit={handleSubmit}>
            <Layout.Row justify="center" margin={{ bottom: 5 }}>
              {/* <img src={logo} width="100" height="100" /> */}
              <Typography.H4>{Dictionary.terms.logo}</Typography.H4>
            </Layout.Row>
            <Title>
              <Typography.H4>{Dictionary.terms.login}</Typography.H4>
            </Title>
            <Form.TextInput
              type={InputType.Text}
              name="username"
              value={values.username}
              label={
                values.username
                  ? Dictionary.auth.username.labelWithValue
                  : Dictionary.auth.username.label
              }
              placeholder={Dictionary.auth.username.placeholder}
              error={touched.username ? errors.username : ""}
              // margin={{ bottom: 2 }}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.TextInput
              type={showPassword ? InputType.Text : InputType.Password}
              name="password"
              value={values.password}
              label={Dictionary.auth.password.label}
              placeholder={Dictionary.auth.password.placeholder}
              error={touched.password ? errors.password : ""}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              // visibilityIcon={
              //   values.password && (
              //     <EyeIcon
              //       size={(t) => t.m}
              //       onClick={togglePasswordVisibility}
              //       svg={Svgs.Add}
              //       showPassword={showPassword}
              //     />
              //   )
              // }
            />
          </Form>
          <Form maxWidth={40} onSubmit={handleSubmit}>
            {/* <Layout.Row margin={{ top: 4 }}>
                <Link to={routes.forgotPassword}>{Dictionary.auth.password.forgot}</Link>
              </Layout.Row> */}
            <SubmitButton
              loading={loading}
              onClick={handleSubmit}
              title={Dictionary.terms.login}
              // disabled={!isValid || !dirty}
            ></SubmitButton>
          </Form>
          <Question>{Dictionary.auth.register.account}</Question>
          <Layout.Row justify="center">
            <Link to={routes.signUp}>{Dictionary.auth.register.cta}</Link>
          </Layout.Row>
        </Flex>
      </Flex>
    </Container>
  );
}
