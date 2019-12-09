import React, { useState } from 'react';
// import moment from 'moment';
// import 'moment-timezone';
// components
import Header from '../../libs/ui/Header/Header';
import Login from '../Login/Login';
import FitmasCalendar from '../FitmasCalendar/FitmasCalendar';
import DayView from '../DayView/DayView';
// // assets
// import dummyData from '../../data/dummy';

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
  const [username, setUsername] = useState('');
  const [plan, setPlan] = useState([]);
  const usernameSubmitted = (data) => {
    fetch(`/api/users/${data.username}/plan`)
      .then(res => res.json())
      .then(res => {
        setUsername(data.username);
        if (res.plan && res.plan.length) setPlan(res.plan);
      })
      .catch(err => {
        console.log(`error fetching plan data for ${data.username}`, err);
      });
  };
  return (
    <Wrapper>
      <Header
        size="h1"
        removeMarginTop
        addPaddingTop>
        <span role="img" aria-label="christmas-tree">🎄</span>
        Welcome to 25 Days of Fitmas{username ? `, ${username}` : ''}
        <span role="img" aria-label="muscles">💪🏼</span>
        !
      </Header>
      {!username
        && <Login
          username={username}
          onSubmit={usernameSubmitted}
        />
      }
      {username &&
        <div>
          <DayView
            day="2019-12-01"
            plan={plan}
            username={username}
          />
          <FitmasCalendar plan={plan} />
        </div>
      }
    </Wrapper>
  );
};

export default App;
