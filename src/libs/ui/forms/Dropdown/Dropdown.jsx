import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
// components
import Label from '../Label/Label';
import Option from '../Option/Option';

// styled components
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  select {
    padding: 1rem 1.5rem;
    font-size: var(--input-font-size);
    width: var(--input-width);
    height: var(--input-height);
    border: 2px solid black;
    border-radius: var(--input-radius);
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: white;

    &:hover {
      cursor: pointer;
      border: 2px solid black;
    }
  }
`;

const Multiple = styled.div`
  select {
    height: 100%;
    border-radius: 0;
  }
`;

const Dropdown = ({
  name,
  label,
  options,
  multiple,
}) => {
  const OptionsToRender = options.map(o => (
    <Option key={`${name}-${o.value}-option`} value={o.value}>
      {o.label}
    </Option>
  ))
  const SelectField = (
    <Field
      name={name}
      type="select"
      component="select"
      multiple={multiple}>
      {OptionsToRender}
    </Field>
  );
  return (
    <Wrapper>
      <Label inline>{label}</Label>
      {/* only allow single option selection */}
      {!multiple
        && SelectField}
      {/* enable multi-option selection */}
      {multiple
        && (
          <Multiple>
            {SelectField}
          </Multiple>
        )}
    </Wrapper>
  );
};

Dropdown.defaultProps = {
  multiple: false,
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.any.isRequired,
  multiple: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.any,
    value: PropTypes.string,
  })).isRequired,
};

export default Dropdown;
