import { Search } from "history";
import { useNavigate } from "react-router-dom";

export function useNavigation() {
  const navigateFunction = useNavigate();

  const routes = {
    root: "/",
    signUp: "/sign-up",
    forgotPassword: "/forgot-password",
    passwordChanged: "/password-changed",
    globalSettings: `/global-settings`,
    account: {
      base: `/account`,
      resetPassword: `/account/change-password`,
    },
    dashboard: {
      base: "/dashboard",
    },
  };

  function navigate(pathname: string, search?: Search) {
    navigateFunction(pathname);
  }

  function replace(pathname: string, search?: Search) {
    navigateFunction(pathname);
  }

  function goBack() {
    navigateFunction(-1);
  }

  return {
    routes,
    navigate,
    replace,
    goBack,
  };
}
