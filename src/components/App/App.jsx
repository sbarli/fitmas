import React from 'react';
import moment from 'moment';
import 'moment-timezone';
// components
import Header from '../../libs/ui/Header/Header';
import DayView from '../DayView/DayView';
import FitmasCalendar from '../FitmasCalendar/FitmasCalendar';
// assets
import dummyData from '../../data/dummy';

// styled components
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
  padding-left: 10rem;
  padding-right: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const App = () => {
  return (
    <Wrapper>
      <Header
        size="h1"
        removeMarginTop
        addPaddingTop>
        <span role="img" aria-label="christmas-tree">🎄</span>
        Welcome to 25 Days of Fitmas, {dummyData.user}
        <span role="img" aria-label="muscles">💪🏼</span>
        !
      </Header>
      <DayView
        day="Today"
        data={dummyData.plan[moment().tz(moment.tz.guess()).format('YYYY-MM-DD')]}
      />
      <FitmasCalendar />
    </Wrapper>
  );
};

export default App;
