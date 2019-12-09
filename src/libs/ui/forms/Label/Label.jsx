import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const StyledLabel = styled.label(({ inline }) => `
  font-size: var(--normal-font-size);
  font-weight: var(--bold-font-weight);
  margin-right: ${inline ? "1rem" : "0"};
`);

const Label = ({ children, inline }) => {
  return (
    <StyledLabel>{children}</StyledLabel>
  );
};

Label.defaultProps = {
  inline: false,
};

Label.propTypes = {
  children: PropTypes.any.isRequired,
  inline: PropTypes.bool,
};

export default StyledLabel;
