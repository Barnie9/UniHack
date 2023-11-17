import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Sidebar, Topbar } from "components/layout";

import { useScrollTop, useLogin } from "hooks";
// import { Signup, Login, PasswordChangedPage } from "pages";

import { GridProvider } from "./GridProvider";
import { PrivateRoutes } from "./PrivateRoutes";

import { Main } from "./Router.style";

export enum DefaultRoutes {
  Root = "/",
  ForgotPassword = "/forgot-password",
  SignUp = "/sign-up",
  PasswordChanged = "/password-changed",
  Account = "/account",
  ChangePassword = "/account/change-password",
}

function Router() {
  useScrollTop();
  const [{ data: session }] = useLogin();

  if (session) {
    return (
      <>
        {/* <Topbar />
        <Sidebar /> */}
        <Suspense fallback={<div>Loading..</div>}>
          <PrivateRoutes />
        </Suspense>
      </>
    );
  }
  return (
    <Routes>
      {/* {accountMetadata.passwordChanged && ( */}
      {/* <Route exact path={Routes.PasswordChanged}>
        <PasswordChangedPage />
      </Route> */}
      {/* )} */}
      {/* <Route exact path={Routes.ResetPassword}>
				<ResetPasswordPage />
			</Route>
			<Route exact path={Routes.ForgotPassword}>
				<ForgotPasswordPage />
			</Route> */}
      {/* <Route exact path={Routes.SignUp}>
        <Signup />
      </Route>
      <Route path="*">
        <Login />
      </Route> */}
    </Routes>
  );
}

export default function () {
  return (
    <Main>
      <GridProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </GridProvider>
    </Main>
  );
}
