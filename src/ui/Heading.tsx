import styled, { css } from "styled-components";

const headingType = {
  h1: css`
    font-size: 3rem;
    font-weight: 600;
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 600;
  `,
  h3: css`
    font-size: 2rem;
    font-weight: 500;
  `,
};

type HeadingProps = {
  type: keyof typeof headingType;
};

const Heading = styled.h1<HeadingProps>`
  line-height: 1.4;
  ${({ type }) => headingType[type]}
`;

export default Heading;
