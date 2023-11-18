import styled from "styled-components";
import { Button } from "components/UI/Interactables/Button";
import { MediaQueriesDevices } from "environment/theme/Sizes";
import { Colors } from "environment";
import { Icon } from "components/UI/Icons";
import { Typography } from "components/UI/Typography";

interface Props {
  showPassword?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  justify-content: center;

  @media ${MediaQueriesDevices.tablet} {
    padding: 2rem;
  }
`;

export const SubmitButton = styled(Button)`
  align-self: flex-end;
  width: 23.2rem;
  height: 4rem;
  margin: 4rem 8.4rem;

  @media ${MediaQueriesDevices.tablet} {
    width: 23.2rem;
  }

  @media ${MediaQueriesDevices.desktop} {
    margin-top: 4rem;
  }
`;

export const Question = styled(Typography.Caption)`
  text-align: center;

  @media ${MediaQueriesDevices.desktop} {
    margin-top: 8rem;
  }
`;

export const Separator = styled.div`
  background: ${Colors.pink};
  border-radius: 100vw;
  height: 0.1rem;
  margin: 3.2rem 0 2.4rem;
  width: 57.6rem;
  justify-content: center;
`;

export const EyeIcon = styled(Icon)<Props>`
  svg {
    line {
      visibility: ${({ showPassword }) =>
        showPassword ? "visible" : "hidden"};
    }
  }
`;

export const Title = styled.div`
  justify-content: center;
  display: flex;
`;

export const Image = styled.img`
  width: 50%;
`;
