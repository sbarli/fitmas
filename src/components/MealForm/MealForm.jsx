import React, { useState } from 'react';
import { Form, /*Field*/ } from 'react-final-form';
import moment from 'moment';
import meals from '../../data/meals';
// import styled from 'styled-components/macro';
// components
import Datepicker from '../../libs/ui/forms/Datepicker/Datepicker';
import Dropdown from '../../libs/ui/forms/Dropdown/Dropdown';
import Textarea from '../../libs/ui/forms/Textarea/Textarea';
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
                  name="mealItems"
                  label="Select Meal Items"
                  options={[
                    ...meals[values.mealType].map(item => ({
                      value: item,
                      label: item,
                    })),
                    {
                      value: 'Other',
                      label: 'Other',
                    },
                  ]}
                  multiple={true}
                />
              )
            }
            {values
              && values.mealItems
              && values.mealItems.indexOf('Other') !== -1
              && (
                <Textarea
                  name="mealItemsOther"
                  label="Add additional items, each on a new line"
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

export default MealForm;
