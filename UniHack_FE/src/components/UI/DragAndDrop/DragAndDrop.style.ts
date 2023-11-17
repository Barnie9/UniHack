import styled, { css } from "styled-components/macro";

import { Colors, ColorsX } from "environment";

interface DragDropContainerProps {
  isDragActive: boolean;
  isFileDragged: boolean;
  error: boolean;
  disabled: boolean;
}

export const DragDropContainer = styled.div<DragDropContainerProps>`
  ${({ isDragActive, isFileDragged, error, disabled }) => css`
    background: ${isDragActive ? Colors.gray.lighter : Colors.silver.lightest};
    display: flex;
    flex: 1;
    flex-direction: row;
    min-width: 0;
    padding: ${isFileDragged ? "1rem 2rem" : "4rem"};
    border: 0.1rem dashed
      ${error ? ColorsX.primary.normal : Colors.gray.lighter};
    border-radius: 0.4rem;
    font-size: 1.6rem;
    color: ${isFileDragged ? Colors.gray.darkest : Colors.gray.medium};
    outline: none;
    transition: background 0.2s;
    opacity: ${disabled ? 0.5 : 1};
  `}
`;

export const BrowseButton = styled.span`
  cursor: pointer;
  color: ${ColorsX.primary.normal};
`;

interface DragActiveDivProps {
  isDragActive?: boolean;
}

export const DragInDiv = styled.div<DragActiveDivProps>`
  opacity: ${({ isDragActive }) => (isDragActive ? "0" : "1")};
  transition: opacity 0.2s linear;
`;

interface ClickableTextProps {
  isClickable?: boolean;
}

export const FileContainer = styled(DragInDiv)<ClickableTextProps>`
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
`;

export const FileText = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ErrorMessage = styled.span`
  color: ${ColorsX.text.error};
`;
