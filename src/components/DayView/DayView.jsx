import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// components
import Header from '../../libs/ui/Header/Header';
import Paragraph from '../../libs/ui/Paragraph/Paragraph';

// styled components
import styled from 'styled-components/macro';
const Wrapper = styled.div`
  width: 100%;
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

const Row = styled.div(({ first }) => `
  ${!first ? 'margin-top: 1rem;' : ''}
  display: grid;
  grid-template-columns: 20% 20% 1fr;
`);

// helper functions
const createFoodRow = (day, meal, isFirst = false) => {
  console.log('isFirst: ', isFirst);
  return (
    <Row key={`${day}-${meal.mealType}`} first={isFirst}>
      <div></div>
      <div>
        <Paragraph singleSpaced>{meal.mealType}</Paragraph>
      </div>
      <div>
        <Paragraph singleSpaced>{meal.items.join(', ')}</Paragraph>
      </div>
    </Row>
  );
};

const createExerciseRow = (day, exercise, isFirst = false) => {
  console.log('isFirst: ', isFirst);
  return (
    <Row key={`${day}-${exercise.category}-${exercise.item}`} first={isFirst}>
      <div></div>
      <div>
        <Paragraph singleSpaced>{exercise.category}</Paragraph>
      </div>
      <div>
        <Paragraph singleSpaced>{exercise.item}</Paragraph>
      </div>
    </Row>
  );
};

const DayView = ({ day, data: { food, exercise } }) => {
  const DayHeader = typeof day === 'string'
    ? day
    : moment(day).format('ddd, MMM Do, YYYY');
  const dayText = typeof day === 'string'
    ? day
    : moment(day).format('YYYY-dd-MM');
  const FoodItems = food.map((meal, i) => createFoodRow(dayText, meal, i === 0));
  const ExerciseItems = exercise.map((item, i) => createExerciseRow(dayText, item, i === 0));
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
    food: [],
    exercise: [],
  },
};

DayView.propTypes = {
  day: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  data: PropTypes.shape({
    food: PropTypes.arrayOf(PropTypes.object),
    exercise: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default DayView;
