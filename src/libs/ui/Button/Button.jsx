import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const themes = {
  green: `
    color: green;
    background: white;
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
