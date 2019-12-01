import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// components
import Header from '../../libs/ui/Header/Header';
// assets
import { plan as dummyData } from '../../data/dummy';

// lib styles
import 'react-big-calendar/lib/css/react-big-calendar.css';

// styled components
import styled from 'styled-components/macro';
const CalendarWrapper = styled.div`
  height: 50rem;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

// configure date / time localizer
const localizer = momentLocalizer(moment);

// format dummy data
const events = [];
const createEventObj = (type, data) => {
  return {
    title: type === 'food'
      ? `${data.details.category} - ${data.details.items.join(', ')}`
      : `Exercise: ${data.details.category} - ${data.details.item}`,
    start: new Date(data.start),
    end: new Date(data.end),
    allDay: data.allDay,
    details: { ...data.details },
  }
};

Object.keys(dummyData).forEach(date => {
  const data = dummyData[date];
  const dateObj = moment(date);
  const start = dateObj.clone();
  const end = dateObj.clone();
  if (data.food) {
    Object.keys(data.food).forEach(category => {
      const type = 'food';
      const meal = data.food[category];
      let mealStart = start.clone();
      let mealEnd = end.clone();
      let allDay = false;
      switch (category) {
        case 'Breakfast':
          mealStart.hour(8);
          mealStart.minutes(0);
          mealEnd.hour(8);
          mealEnd.minutes(30);
          break;
        case 'Lunch':
          mealStart.hour(13);
          mealStart.minutes(0);
          mealEnd.hour(13);
          mealEnd.minutes(30);
          break;
        case 'Dinner':
          mealStart.hour(19);
          mealStart.minutes(0);
          mealEnd.hour(20);
          mealEnd.minutes(0);
          break;
        case 'Snacks':
          allDay = true;
          break;
        default:
          console.log(`unknown meal category: ${category}`);
      }
      const mealEvent = createEventObj(type, {
        start: mealStart,
        end: mealEnd,
        allDay,
        details: { type, category, ...meal },
      });
      events.push(mealEvent);
    });
  }
  if (data.exercise) {
    data.exercise.forEach(ex => {
      const type = 'exercise';
      let exStart = start.clone();
      let exEnd = end.clone();
      let allDay = true;
      const exEvent = createEventObj(type, {
        start: exStart,
        end: exEnd,
        allDay,
        details: { type, ...ex },
      });
      events.push(exEvent);
    });
  }
});

const renderTooltipDisplay = event => {
  if (event.details.type === 'food') {
    const foodTip = `${event.details.category} - ${event.details.items.join(', ')}`
    return foodTip;
  }
  else if (event.details.type === 'exercise') {
    const exTip = `${event.details.category} - ${event.details.item}`;
    return exTip;
  }
};

const FitmasCalendar = () => {
  return (
    <CalendarWrapper>
      <Header
        size="h2"
        center>
        Calendar View
      </Header>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        tooltipAccessor={renderTooltipDisplay}
      />
    </CalendarWrapper>
  );
};

export default FitmasCalendar;
