import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
// components
import Label from '../Label/Label';

// styled components
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  margin: 2rem 0;
  input {
    width: var(--input-width);
    height: var(--input-height);
    font-size: var(--input-font-size);
    padding: 0 1.5rem;
    border: 2px solid black;
    border-radius: var(--input-radius);
  }
`;

const Input = ({
  name,
  label,
  placeholder,
}) => {
  return (
    <Wrapper>
      <Label inline>{label}</Label>
      <Field
        name={name}
        component="input"
        type="text"
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

Input.defaultProps = {
  placeholder: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.any.isRequired,
  // value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default Input;
