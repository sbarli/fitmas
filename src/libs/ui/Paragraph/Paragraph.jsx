import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components/macro';

const singleSpacedStyles = `
  margin-top: 0;
  margin-bottom: 0;
`;

const ParagraphWrapper = styled.p(({ center, singleSpaced }) => `
  font-size: var(--normal-font-size);
  ${singleSpaced && singleSpacedStyles}
  ${center ? 'text-align: center;' : ''}
`);

const Paragraph = (props) => {
  return (
    <ParagraphWrapper {...props}>{props.children}</ParagraphWrapper>
  );
};

Paragraph.propTypes = {
  children: PropTypes.any.isRequired,
  // styles
  singleSpaced: PropTypes.bool,
  center: PropTypes.bool,
};

export default Paragraph;
