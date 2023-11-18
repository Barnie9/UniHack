import React from "react";

import { Layout } from "components/UI/Layout";
import { Typography } from "components/UI/Typography";
import { Button } from "components/UI/Interactables/Button";
import { Colors, Images } from "environment";
import { useAccountMetadata, useNavigation } from "hooks";

export function PasswordChangedPage() {
  const [, setAccountMetadata] = useAccountMetadata();
  const { replace, routes } = useNavigation();

  function handleClick() {
    setAccountMetadata({ passwordChanged: false });
    replace(routes.root);
  }

  return (
    <Layout.Column flex={1} justify="center" align="center">
      {/* <Images.PasswordActions /> */}
      <Typography.H3>Change password</Typography.H3>
      {/* <Typography.P color={Colors.bluishGrey}>
				{Dictionary.auth.passwordChanged.description}
			</Typography.P> */}
      <Button onClick={handleClick} title="Login"></Button>
    </Layout.Column>
  );
}
