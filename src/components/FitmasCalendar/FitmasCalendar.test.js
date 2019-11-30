import React from 'react';
import ReactDOM from 'react-dom';
import FitmasCalendar from './FitmasCalendar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FitmasCalendar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
