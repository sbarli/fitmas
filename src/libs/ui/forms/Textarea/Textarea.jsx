import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
// components
import Label from '../Label/Label';

// styled components
import styled from 'styled-components/macro';

const Wrapper = styled.div``;

const Textarea = ({
  name,
  label,
  value,
  placeholder,
}) => {
  return (
    <Wrapper>
      <Field name={name} type="textarea">
        {props => (
          <div>
            <Label>{label}</Label>
            <textarea {...props.input} placeholder={placeholder} />
          </div>
        )}
      </Field>
    </Wrapper>
  );
};

Textarea.defaultProps = {
  placeholder: '',
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.any.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Textarea;
