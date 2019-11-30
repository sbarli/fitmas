import React from 'react';
import moment from 'moment';
// components
import Header from '../../libs/ui/Header/Header';
import DayView from '../DayView/DayView';
// import MealForm from '../MealForm/MealForm';

// styled components
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  padding-left: 10rem;
  padding-right: 10rem;
  background: steelblue;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const dummyData = {
  Today: {
    food: [
      {
        mealType: "Breakfast",
        items: [
          'Eggs',
          'Bacon',
          'Coffee',
        ],
      },
      {
        mealType: "Dinner",
        items: [
          'Grilled Chicken',
          'Green Beans',
          'Rice',
        ],
      },
    ],
    exercise: [
      {
        category: 'Running',
        item: 'Warmup - 0.5 miles',
      },
      {
        category: 'Boxing',
        item: 'Quiet Punch',
      },
    ],
  },
  '2019-12-01': {
    food: [
      {
        mealType: "Breakfast",
        items: [
          'Quiche',
          'Coffee',
        ],
      },
      {
        mealType: "Snack",
        items: [
          'RX Bar',
        ],
      },
    ],
    exercise: [
      {
        category: 'Boxing',
        item: 'Box \'n Burn',
      },
    ],
  },
};

const App = () => {
  return (
    <Wrapper>
      <Header
        size="h1"
        removeMarginTop
        addPaddingTop>
        <span role="img" aria-label="christmas-tree">🎄</span>
        Welcome to 25 Days of Fitmas
        <span role="img" aria-label="muscles">💪🏼</span>
        !
      </Header>
      {/* <MealForm /> */}
      <DayView
        day="Today"
        data={dummyData.Today}
      />
      <DayView
        day={new Date(moment().add(1, 'd'))}
        data={dummyData['2019-12-01']}
      />
    </Wrapper>
  );
};

export default App;
