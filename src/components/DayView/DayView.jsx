import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// components
import Header from '../../libs/ui/Header/Header';
import ViewItemRow from '../ViewItemRow/ViewItemRow';

// styled components
import styled from 'styled-components/macro';
const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const ViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 2rem;
`;

const View = styled.div`
  border: 1px solid black;
  padding: 1rem 2rem;
`;

const DayView = ({ day, data }) => {
  const [food, updateFood] = useState(data.food);
  const [exercise, updateExercise] = useState(data.exercise);
  const checkChange = (type, checkName, checkVal) => {
    switch (type) {
      case 'food':
        const mealToSearchFor = checkName.split('_')[1];
        const updatedFood = Object.keys(food).reduce((updated, category) => ({
          ...updated,
          [category]: Object.assign(
            {},
            food[category],
            category === mealToSearchFor ? { done: checkVal } : {}
          ),
        }), {});
        updateFood(updatedFood);
        break;
      case 'exercise':
        const splitName = checkName.split('_');
        const exCat = splitName[1];
        const exItem = splitName[2];
        const updatedExercise = exercise.map(ex => (
          ex.category === exCat && ex.item === exItem
            ? Object.assign({}, ex, { done: checkVal })
            : Object.assign({}, ex)
        ));
        updateExercise(updatedExercise);
        break;
      default:
        console.log(`unknown value checked - type: ${type}, name: ${checkName}, value: ${checkVal}`);
    }
  };
  const createExerciseRows = (data) => {
    return data.map((exercise, i) => {
      const exerciseData = {
        category: exercise.category,
        items: exercise.item,
        name: `${dayText}_${exercise.category}_${exercise.item}`,
        done: exercise.done,
        checkChange,
      };
      return (
        <ViewItemRow
          key={exerciseData.name}
          rowType="exercise"
          day={dayText}
          data={exerciseData}
          isFirst={i === 0}
        />
      )
    });
  };
  const createFoodRows = (food) => {
    return Object.keys(food).map((category, i) => {
      const details = food[category];
      const mealData = {
        category,
        items: details.items.join(', '),
        name: `${dayText}_${category}`,
        done: details.done,
        checkChange,
      };
      return (
        <ViewItemRow
          key={mealData.name}
          rowType="food"
          day={dayText}
          data={mealData}
          isFirst={i === 0}
        />
      )
    });
  };
  const DayHeader = typeof day === 'string'
    ? day
    : moment(day).format('ddd, MMM Do, YYYY');
  const dayText = typeof day === 'string'
    ? moment().format('YYYYMMDD')
    : moment(day).format('YYYYMMDD');
  const FoodItems = createFoodRows(food);
  const ExerciseItems = createExerciseRows(exercise);
  return (
    <Wrapper>
      <Header size="h2" center>
        {DayHeader}
      </Header>
      <ViewContainer>
        <View>
          <Header size="h3" center removeMarginTop>Food</Header>
          {FoodItems}
        </View>
        <View>
          <Header size="h3" center removeMarginTop>Exercise</Header>
          {ExerciseItems}
        </View>
      </ViewContainer>
    </Wrapper>
  );
};

DayView.defaultProps = {
  data: {
    food: {},
    exercise: [],
  },
};

DayView.propTypes = {
  day: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  data: PropTypes.shape({
    food: PropTypes.object,
    exercise: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default DayView;
