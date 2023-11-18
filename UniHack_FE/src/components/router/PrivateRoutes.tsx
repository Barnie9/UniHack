import React from "react";
import { Route, Routes } from "react-router-dom";

const AccountPage = React.lazy(() => import("pages/account/AccountPage"));
const DashboardPage = React.lazy(() => import("pages/dashboard/Dashboard"));
const DicomPage = React.lazy(() => import("pages/dicom/Dicom"));

import { DefaultRoutes } from "./Router";

export function PrivateRoutes() {
  // const [{ data: user }, getUser] = useUser();

  // useEffectOnce(() => {
  //   if (!user) {
  //     getUser();
  //   }
  // });

  return (
    <Routes>
      <Route path={DefaultRoutes.Account} element={<AccountPage />}></Route>

      <Route
        path={DefaultRoutes.Dashboard}
        // render={() => <Navigate to={DefaultRoutes.Dashboard} />}
        element={<DashboardPage />}
      />
      <Route path={DefaultRoutes.Dicom} element={<DicomPage />} />
    </Routes>
  );
}
