import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffectOnce, useUser } from "hooks";

// const AccountPage = React.lazy(() => import("pages/account/AccountPage"));
// const DashboardPage = React.lazy(() => import("pages/dashboard/Dashboard"));

import { DefaultRoutes } from "./Router";

export function PrivateRoutes() {
  const [{ data: user }, getUser] = useUser();

  useEffectOnce(() => {
    if (!user) {
      getUser();
    }
  });

  return (
    <Routes>
      <Route path={DefaultRoutes.Account}>{/* <AccountPage /> */}</Route>

      {/* <Route
        path="*"
        render={() => <Navigate to={DefaultRoutes.Dashboard} />}
      /> */}
    </Routes>
  );
}
