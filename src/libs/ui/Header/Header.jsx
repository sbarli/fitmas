import React from 'react';
import PropTypes from 'prop-types';

// styled components
import mixins from '../styles/mixins';
import styled from 'styled-components/macro';

const centeredHeader = `
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.header(({ center }) => `
  ${center && centeredHeader}
`);

const sharedHeaderStyles = ({
  removeMarginTop, addPaddingTop, theme,
  borderImage,
}) => (`
  width: fit-content;
  ${removeMarginTop ? 'margin-top: 0;' : ''}
  ${addPaddingTop ? 'padding-top: 5rem;' : ''}
  ${borderImage ? theme.borderImage(...borderImage) : ''}
`);

const headerStyles = {
  h1: styled.h1((props) => {
    const sharedProps = { ...props, borderImage: ['green', 'blue', '6px' ] };
    return (`
      ${sharedHeaderStyles(sharedProps)}
      font-size: 2.8rem;
  `)}),
  h2: styled.h2((props) => {
    const sharedProps = { ...props, borderImage: ['red', 'orange', '4px' ] };
    return (`
      ${sharedHeaderStyles(sharedProps)}
      font-size: 2.2rem;
  `)}),
  h3: styled.h3((props) => `
    ${sharedHeaderStyles(props)}
    font-size: 1.8rem;
    font-weight: var(--bold-font-weight);
    text-transform: uppercase;
  `),
};

const Header = (props) => {
  const HeaderToRender = headerStyles[props.size];
  return (
    <HeaderWrapper {...props}>
      <HeaderToRender {...props} theme={mixins}>{props.children}</HeaderToRender >
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
