import React, { useState } from 'react';
import { Form } from 'react-final-form';
import moment from 'moment';
import 'moment-timezone';
// assets
import options from '../../data/options';

// components
import MealFormFields from '../MealFormFields/MealFormFields';
import WorkoutFormFields from '../WorkoutFormFields/WorkoutFormFields';
import Datepicker from '../../libs/ui/forms/Datepicker/Datepicker';
import Dropdown from '../../libs/ui/forms/Dropdown/Dropdown';
import Checkbox from '../../libs/ui/forms/Checkbox/Checkbox';
import Textarea from '../../libs/ui/forms/Textarea/Textarea';
import Button from '../../libs/ui/Button/Button';

// styled components
// import styled from 'styled-components/macro';

// helper functions / constants
const dropdownDefault = { value: '', label: '--- Choose One ---' };
const otherOption = { value: 'Other', label: 'Other' };

const typeOptions = [
  Object.assign({}, dropdownDefault),
  ...options.types.map(item => ({
    value: item,
    label: item,
  }))
];

const foodCategoryOptions = [
  Object.assign({}, dropdownDefault),
  ...options.food.categories.map(item => ({
    value: item,
    label: item,
  }))
];

const exerciseCategoryOptions = [
  Object.assign({}, dropdownDefault),
  ...options.exercise.categories.map(item => ({
    value: item,
    label: item,
  })),
  Object.assign({}, otherOption),
];

const onSubmit = async (values) => {
  console.log('form submitted', JSON.stringify(values, null, 2));
};

const PlanItemForm = () => {
  const [defaultDate] = useState(moment().tz(moment.tz.guess()).toDate());
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <h2>Add / Edit Plan Item</h2>
            <Datepicker
              name="date"
              label="Item Date"
              defaultDate={defaultDate}
            />
            <Dropdown
              name="type"
              label="Item Type"
              options={typeOptions}
            />
            {values
              && values.type === 'food'
              && (
                <MealFormFields 
                  categoryOptions={foodCategoryOptions}
                  itemOptions={[
                    {
                      value: 'Cheese',
                      label: 'Cheese',
                    },
                    Object.assign({}, otherOption),
                  ]}
                  categoryValue={values.category}
                  itemValues={values.items}
                />
              )
            }
            {values
              && values.type === 'exercise'
              && (
                <WorkoutFormFields 
                  categoryOptions={exerciseCategoryOptions}
                  itemOptions={[
                    Object.assign({}, dropdownDefault),
                    {
                      value: 'Quiet Punch',
                      label: 'Quiet Punch',
                    },
                    Object.assign({}, otherOption),
                  ]}
                  categoryValue={values.category}
                  itemValue={values.item}
                />
              )
            }
            <Textarea 
              name="notes"
              label="Any additional notes / context"
            />
            <Checkbox 
              name="done"
              label="Complete?"
            />
            <Button type="submit" theme="green">Submit</Button>
          </form>
        )
      }}
    />
  );
};

export default PlanItemForm;
