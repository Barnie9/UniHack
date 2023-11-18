import React from "react";

import { Layout } from "components/UI/Layout";
import { PageContainer } from "components/layout";
import { Link } from "components/UI/Link";
import { Tabs } from "components/UI/Tabs";
import { Button } from "components/UI/Interactables/Button";
import { Dictionary } from "environment";
// import { DeleteAccountModal } from "features/account/DeleteAccountModal";

import { Loader } from "components/UI/Loader";
// import { AccountForm } from "features/account";
import {
  useUser,
  // useNavbarFeatures,
  useLogout,
  useNavigation,
  useModal,
} from "hooks";

import { ChangePassword } from "./ChangePasswordPage";

import {
  Avatar,
  Separator,
  Description,
  Wrapper,
  H6,
} from "./AccountPage.style";

export default function () {
  const { routes, navigate } = useNavigation();

  // const logout = useLogout();
  // const [{ data: user, loaded, loading }] = useUser();
  // const [modalProps, openModal] = useModal();
  // const [, setNavbarFeatures] = useNavbarFeatures();

  // useEffectOnce(() => {
  // 	setNavbarFeatures({ date: false, device: false });
  // });

  // function handleLogout() {
  //   logout();
  //   navigate(routes.root);
  // }
  return (
    <PageContainer>
      {/* <Loader loading={loading} condition={!loaded}>
        <Layout.Row align="center" margin={{ bottom: 3.2 }} width="100%">
          <Layout.Column>
            <H6>{Dictionary.account.title}</H6>
          </Layout.Column>
        </Layout.Row>
        {loaded && (
          <Tabs orientation="horizontal">
            <Tabs.Item width={12.6} title={Dictionary.account.tabs[0]}>
              <Wrapper>
                <Layout.Row height="100%">
                  <AccountForm user={user} />
                  <Layout.Column justify="flex-start" width="45%">
                    <Description>{Dictionary.account.profile}</Description>
                    <Separator margin={{ bottom: 4.8 }} />
                    <Avatar>
                      <UserAvatar />
                    </Avatar>
                  </Layout.Column>
                </Layout.Row>
              </Wrapper>
            </Tabs.Item>
            {user && (
              <Tabs.Item width={12.6} title={Dictionary.account.tabs[1]}>
                <ChangePassword username={user?.username} />
              </Tabs.Item>
            )}
          </Tabs>
        )}
        <Layout.Column align="flex-start">
          <Separator margin={{ top: 3.2, bottom: 4 }} />
          <Link weight={600} onClick={openModal}>
            {Dictionary.account.delete.title}
          </Link>
          <Button
            margin={{ top: 8 }}
            onClick={handleLogout}
            title="Logout"
          ></Button>
          {user && (
            <DeleteAccountModal username={user.username} {...modalProps} />
          )}
        </Layout.Column>
      </Loader> */}
    </PageContainer>
  );
}
