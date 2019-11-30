import React from 'react';
import styled from 'styled-components/macro';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// styles
import 'react-big-calendar/lib/css/react-big-calendar.css';

// configure date / time localizer
const localizer = momentLocalizer(moment);

// TEST EVENTS
const myEventsList = [
  {
    title: 'Thanksgiving',
    start: moment().subtract(1, 'd'),
    end: moment().subtract(1, 'd'),
    allDay: true,
  },
  {
    title: 'Black Friday',
    start: moment(),
    end: moment(),
    allDay: true,
  },
];

const CalendarWrapper = styled.div`
  height: 50rem;
  width: 100%;
  padding: 0 5rem;
`;

const FitmasCalendar = () => {
  return (
    <CalendarWrapper>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
      />
    </CalendarWrapper>
  );
};

export default FitmasCalendar;
