import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import * as moment from 'moment';
// import styled from 'styled-components/macro';
import "react-datepicker/dist/react-datepicker.css";
// components

// styled components

// helper functions
const onSubmit = async (values) => {
  console.log('form submitted', JSON.stringify(values, null, 2));
};

const MealForm = () => {
  const [defaultDate] = useState(moment().toDate());
  return (
    <Form
      onSubmit={onSubmit}
      // validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h2>Meal Input Form</h2>
          <div>
            <label>Meal Date</label>
            <Field name="mealDate">
              {props => (
                <DatePicker
                  name={props.input.name}
                  selected={defaultDate}
                  onChange={props.input.onChange}
                />
              )}
            </Field>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    />
  );
};

/**
 * component notes:
 * - date: datepicker
 * - type: dropdown - 'Breakfast', 'Lunch', 'Dinner', 'Snack'
 * - meal: checkboxes - meal options for selected meal type
 */

export default MealForm;
