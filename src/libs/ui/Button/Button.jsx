import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const themes = {
  green: `
    color: white;
    background: green;
    border: 1px solid darkgreen;
    border-radius: var(--input-radius);
    padding: 5px;
  `,
  transparent: `
    color: black;
    background: transparent;
    border: none;
    border-radius: none;
  `,
};

const ButtonWrapper = styled.button(({ theme }) => `
  ${themes[theme]}
  width: 15rem;
  height: 3.5rem;
  font-weight: var(--bold-font-weight);
  font-size: var(--normal-font-size);
`);

const Button = (props) => {
  return (
    <ButtonWrapper {...props} />
  );
};

Button.defaultProps = {
  type: 'button',
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  theme: PropTypes.oneOf([
    'green', 'transparent'
  ]).isRequired,
  type: PropTypes.oneOf([
    'button', 'submit'
  ]).isRequired,
};

export default Button;
