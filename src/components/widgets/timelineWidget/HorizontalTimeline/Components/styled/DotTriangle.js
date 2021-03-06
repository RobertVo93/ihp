import styled, { css } from "styled-components";

const DotTriangle = styled.span`
  position: absolute;
  cursor: pointer;
  width: ${({ width }) => width}px;
  bottom: 0px;
  height: 12px;
  width: 12px;
  left: 50%;
  transform: translateX(-50%);
  transition: background-color 0.3s, border-color 0.3s;
  transform: rotate(45deg);
  background-color: ${({ styles }) => styles.background};
  border: 2px solid ${({ styles }) => styles.foreground};

${({ type, styles }) =>
    css`
    background-color: ${styles.background};
    border-color: ${styles.foreground};
  `}

${({ type, styles }) =>
    type === "present" &&
    css`
    background-color: ${styles.foreground};
    border-color: ${styles.foreground};
  `}
${({ type, styles }) =>
    type === "future" &&
    css`
    background-color: ${styles.background};
    border-color: ${styles.outline};
  `}
`;

export default DotTriangle;
