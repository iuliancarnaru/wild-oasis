import styled, { css } from "styled-components";

const rowType = {
  horizontal: css`
    justify-content: space-between;
    align-items: center;
  `,
  vertical: css`
    flex-direction: column;
    gap: 1.6rem;
  `,
};

type RowProps = {
  type: keyof typeof rowType;
};

const Row = styled.div<RowProps>`
  display: flex;
  ${({ type }) => rowType[type]}
`;

export default Row;
