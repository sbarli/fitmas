import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const centeredHeader = `
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.header(({ center }) => `
  ${center && centeredHeader}
`);

const sharedHeaderStyles = `
  width: fit-content;
`;

const headerStyles = {
  h1: styled.h1(({ removeMarginTop, addPaddingTop }) => `
    ${sharedHeaderStyles}
    font-size: 2.8rem;
    border-bottom: 4px solid blue;
    ${removeMarginTop ? 'margin-top: 0;' : ''}
    ${addPaddingTop ? 'padding-top: 5rem;' : ''}
  `),
  h2: styled.h2(({ removeMarginTop, addPaddingTop }) => `
    ${sharedHeaderStyles}
    font-size: 2.2rem;
    border-bottom: 2px solid green;
    ${removeMarginTop ? 'margin-top: 0;' : ''}
    ${addPaddingTop ? 'padding-top: 5rem;' : ''}
  `),
  h3: styled.h3(({ removeMarginTop, addPaddingTop }) => `
    ${sharedHeaderStyles}
    font-size: 1.8rem;
    font-weight: var(--bold-font-weight);
    text-transform: uppercase;
    ${removeMarginTop ? 'margin-top: 0;' : ''}
    ${addPaddingTop ? 'padding-top: 5rem;' : ''}
  `),
};

const Header = (props) => {
  const HeaderToRender = headerStyles[props.size];
  return (
    <HeaderWrapper {...props}>
      <HeaderToRender {...props}>{props.children}</HeaderToRender >
    </HeaderWrapper>
  );
};

Header.defaultProps = {
  styles: {},
};

Header.propTypes = {
  children: PropTypes.any.isRequired,
  size: PropTypes.oneOf([
    'h1', 'h2', 'h3',
  ]).isRequired,
  // styles
  center: PropTypes.bool,
  addPaddingTop: PropTypes.bool,
  removeMarginTop: PropTypes.bool,
};

export default Header;
