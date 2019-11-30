import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
// components
import Label from '../Label/Label';

// styled components
import styled from 'styled-components/macro';

const Wrapper = styled.div``;

const Checkbox = ({
  name,
  label,
  value,
  onChange,
}) => {
  return (
    <Wrapper>
      <Label>
        <Field
          name={name}
          component="input"
          type="checkbox"
          value={value}
          onChange={onChange}
        />
        {label}
      </Label>
    </Wrapper>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.any.isRequired,
  value: PropTypes.string.isRequired,
};

export default Checkbox;
