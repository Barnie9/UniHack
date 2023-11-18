import styled from "styled-components/macro";
import { Icon as DefaultIcon } from "components/UI/Icons";
import { Colors } from "environment";
import { MediaQueriesDevices } from "environment/theme/Sizes";

export const Style = styled.div`
  .Toastify__toast-container {
    @media ${MediaQueriesDevices.phone} {
      padding: 0 1rem;
    }

    .Toastify__toast {
      display: flex;
      border-radius: 4px;
      padding: 1rem;
      transition: background 0.2s;

      @media ${MediaQueriesDevices.phone} {
        margin-top: 1rem;
      }

      &-body {
        font-family: "Open Sans", sans-serif;
        font-size: 1.6rem;
        margin: 0;
      }

      &--error {
        background: ${Colors.pink};
      }

      &--success {
        background: ${Colors.green};
      }
    }
  }
`;

export const Icon = styled(DefaultIcon)`
  height: fit-content;
  right: -0.6rem;
  top: -0.6rem;
`;
