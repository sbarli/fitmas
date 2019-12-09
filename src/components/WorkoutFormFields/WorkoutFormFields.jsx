import React, { Fragment } from 'react';
// import styled from 'styled-components/macro';
// components
import Dropdown from '../../libs/ui/forms/Dropdown/Dropdown';
import Input from '../../libs/ui/forms/Input/Input';

// styled components
const WorkoutFormFields = ({ categoryOptions, itemOptions, categoryValue, itemValue }) => {
  return (
    <Fragment>
      <Dropdown
        name="category"
        label="What category of exercise?"
        options={categoryOptions}
      />
      {categoryValue
        && categoryValue === 'Other'
        && (
          <Input
            name="categoryOther"
            label="More specifically, what category of exercise?"
          />
        )
      }
      {categoryValue
        && (
          <Dropdown
            name="item"
            label="What did you do?"
            options={itemOptions}
          />
        )
      }
      {itemValue
        && itemValue === 'Other'
        && (
          <Input
            name="itemOther"
            label="More specifically, what did you do?"
          />
        )
      }
    </Fragment>
  );
};

export default WorkoutFormFields;
