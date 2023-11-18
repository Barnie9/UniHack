import { Icon } from "components/UI/Icons";
import styled from "styled-components";
import { Typography } from "components/UI/Typography";
import { Button } from "components/UI/Interactables/Button";

export const Logo = styled(Icon)`
  svg {
    width: 16.4rem;
    height: 4rem;
  }
`;

export const Spacer = styled.div`
  height: 6.4rem;
  background: transparent;
`;

export const RelativeContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

export const Container = styled.div`
  width: 40rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 4rem;
  min-height: 100vh;
  justify-content: center;

  label {
    span {
      font-weight: normal;
      a {
        font-size: inherit;
        font-weight: inherit;
        color: inherit;
        text-decoration: underline;
      }
    }
  }
`;

export const RecaptchaContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 2.6rem;
  width: 100%;
  height: 7.6rem;
`;

export const ErrorIcon = styled(Icon)`
  position: absolute;
  top: -3.2rem;
`;

export const Question = styled(Typography.Caption)`
  text-align: center;
`;

export const SubmitButton = styled(Button)`
  align-self: flex-end;
  width: 23.2rem;
  height: 4rem;
  margin: 4rem 8.4rem;
`;

export const Title = styled.div`
  justify-content: center;
  display: flex;
`;
