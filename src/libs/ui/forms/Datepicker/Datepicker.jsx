import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import ReactDatepicker from 'react-datepicker';
// components
import Label from '../Label/Label';

// lib styles
import "react-datepicker/dist/react-datepicker.css";

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

const Datepicker = ({
  name,
  label,
  defaultDate,
}) => {
  return (
    <Wrapper>
      <Label inline>{label}</Label>
      <Field name={name}>
        {pickerProps => (
          <ReactDatepicker
            name={pickerProps.input.name}
            selected={pickerProps.input.value || defaultDate}
            value={pickerProps.input.value}
            onChange={pickerProps.input.onChange}
          />
        )}
      </Field>
    </Wrapper>
  );
};

Datepicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.any.isRequired,
  defaultDate: PropTypes.instanceOf(Date).isRequired,
};

export default Datepicker;
