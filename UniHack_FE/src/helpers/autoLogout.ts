import { Auth } from "@aws-amplify/auth";

export async function isAuthSessionExpired(): Promise<boolean> {
  try {
    await Auth.currentSession();
    return false;
  } catch (e) {
    // console.log('Auth session expired on page active', e);
    return true;
  }
}

export async function authLogoutOrManualCleanup() {
  try {
    await Auth.signOut();
    // console.log('SignOut success');
  } catch (err: any) {
    // the very edge case here where signOut fails!
    alert(
      "SignOut failed with error: " + err.message + ". Please login again."
    );
    localStorage.clear();
    window.location.replace("/login"); // can't import from Navigation here.
  }
}
