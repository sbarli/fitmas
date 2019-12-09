import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// components
import Header from '../../libs/ui/Header/Header';

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

// helper functions
const setMealTimes = (category, startDate, endDate) => {
  const mealStart = startDate.clone();
  const mealEnd = endDate.clone();
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
  return {
    start: mealStart,
    end: mealEnd,
    allDay,

  };
}

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

const createEvents = (planItems) => {
  return planItems.map(data => {
    const dateObj = moment(data.date);
    const start = dateObj.clone();
    const end = dateObj.clone();
    const details = {
      type: data.type,
      category: data.category,
      notes: data.notes,
      done: data.done,
    };
    if (data.type === 'food') {
      const mealTimes = setMealTimes(data.category, start, end);
      return createEventObj(data.type, {
        ...mealTimes,
        details: {
          ...details,
          items: data.items,
        },
      });
    }
    else if (data.type === 'exercise') {
      return createEventObj(data.type, {
        start,
        end,
        allDay: true,
        details: {
          ...details,
          item: data.item,
        },
      });
    }
    else return false;
  });
};

const renderTooltipDisplay = event => {
  if (event.details.type === 'food') {
    const foodTip = `${event.details.done ? '✅ ' : ''}${event.details.category} - ${event.details.items.join(', ')}`
    return foodTip;
  }
  else if (event.details.type === 'exercise') {
    const exTip = `${event.details.done ? '✅ ' : ''}${event.details.category} - ${event.details.item}`;
    return exTip;
  }
};

const FitmasCalendar = ({ plan }) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const eventsData = createEvents(plan).filter(item => item);
    setEvents(eventsData);
  }, [plan]);
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

FitmasCalendar.propTypes = {
  plan: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.any.isRequired,
      type: PropTypes.oneOf([
        'food', 'exercise',
      ]).isRequired,
      category: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      item: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.string),
      notes: PropTypes.string,
    })
  ).isRequired,
};

export default FitmasCalendar;
