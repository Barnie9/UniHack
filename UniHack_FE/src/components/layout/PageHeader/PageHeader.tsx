import React, { ReactElement } from "react";

import { Layout } from "components/UI/Layout";
import { Loader } from "components/UI/Loader";
// import { useThemeContext } from 'hooks';
import { Nullable, PlacementProps } from "types";
import { BackIcon, Container, Info, Count, H6 } from "./PageHeader.style";
import { Svgs } from "environment";

interface Props {
  title?: string | ReactElement;
  info?: string;
  back?: string;
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  subtitle?: string | JSX.Element;
  count?: Nullable<number>;
  totalCount?: number;
  onBackClick?: () => void;
  margin?: PlacementProps;
}

export function PageHeader({
  back,
  children,
  className,
  loading,
  title,
  info,
  subtitle,
  count,
  totalCount,
  onBackClick,
  margin,
}: Props) {
  // const theme = useThemeContext();

  return (
    <Container margin={margin} className={className}>
      <Info>
        {(back || onBackClick) && (
          <BackIcon
            // color={theme.header.icon}
            // to={back}
            svg={Svgs.ArrowLeft}
            onClick={onBackClick}
          />
        )}
        <Layout.Column width="auto">
          <Layout.Row align="center" justify="flex-start" width="auto">
            <Layout.Row align="center">
              {typeof title === "string" ? <H6>{title}</H6> : title}
              {info && <Count>{info}</Count>}
            </Layout.Row>
            {loading && (
              <Layout.Column
                justify="center"
                margin={{ left: 3, right: 3 }}
                width="auto"
              >
                <Loader size={4} />
              </Layout.Column>
            )}
          </Layout.Row>
          {subtitle &&
            (typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle)}
        </Layout.Column>
      </Info>
      {children}
    </Container>
  );
}
