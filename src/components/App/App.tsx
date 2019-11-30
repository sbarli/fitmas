import React from 'react';
import styled from 'styled-components/macro';
// components
// import FitmasCalendar from '../FitmasCalendar/FitmasCalendar';
import MealForm from '../MealForm/MealForm';

// styled components
const Wrapper = styled.div`
  height: 100vh;
  background: steelblue;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 0;
  padding-top: 5rem;
`;

const App = () => {
  return (
    <Wrapper>
      <header>
        <Title>Welcome to 25 Days of Fitmas!</Title>
      </header>
      {/* <FitmasCalendar /> */}
      <MealForm />
    </Wrapper>
  );
};

export default App;
