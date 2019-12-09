import React, { Fragment } from 'react';
// import styled from 'styled-components/macro';
// components
import Dropdown from '../../libs/ui/forms/Dropdown/Dropdown';
import Textarea from '../../libs/ui/forms/Textarea/Textarea';

// styled components
const MealFormFields = ({ categoryOptions, itemOptions, categoryValue, itemValues }) => {
  return (
    <Fragment>
      <Dropdown
        name="category"
        label="Which Meal?"
        options={categoryOptions}
      />
      {categoryValue
        && (
          <Dropdown
            name="items"
            label="Select Meal Items"
            options={itemOptions}
            multiple={true}
          />
        )
      }
      {itemValues
        && itemValues.indexOf('Other') !== -1
        && (
          <Textarea
            name="itemsOther"
            label="Add additional items, each on a new line. No commas required!"
          />
        )
      }
    </Fragment>
  );
};

export default MealFormFields;
