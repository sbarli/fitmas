import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ value, children }) => {
  return (
    <option value={value}>{children}</option>
  );
};

Option.defaultProps = {
  value: '',
  children: '--- SELECT ONE ---',
};

Option.propTypes = {
  value: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Option;
