import React, { useState } from 'react';
import { Form, /*Field*/ } from 'react-final-form';
import moment from 'moment';
import meals from '../../data/meals';
// import styled from 'styled-components/macro';
// components
import Datepicker from '../../libs/ui/forms/Datepicker/Datepicker';
import Dropdown from '../../libs/ui/forms/Dropdown/Dropdown';
import Button from '../../libs/ui/Button/Button';

// styled components

// helper functions / constants
const mealTypes = Object.keys(meals).map(m => ({
  value: m,
  label: m,
}));
mealTypes.unshift({ value: '', label: undefined });

const onSubmit = async (values) => {
  console.log('form submitted', JSON.stringify(values, null, 2));
};

const MealForm = () => {
  const [defaultDate] = useState(moment().toDate());
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, values }) => {
        console.log('values: ', values);
        return (
          <form onSubmit={handleSubmit}>
            <h2>Meal Input Form</h2>
            <Datepicker
              name="mealDate"
              label="Meal Date"
              defaultDate={defaultDate}
            />
            <Dropdown
              name="mealType"
              label="Meal Type"
              options={mealTypes}
            />
            {values
              && values.mealType
              && (
                <Dropdown
                  name="meal"
                  label="Select Meal Items"
                  options={meals[values.mealType].map(item => ({
                    value: item,
                    label: item,
                  }))}
                  multiple={true}
                />
              )
            }
            <Button type="submit" theme="green">Submit</Button>
          </form>
        )
      }}
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
