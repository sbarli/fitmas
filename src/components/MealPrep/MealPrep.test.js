import React from 'react';
import ReactDOM from 'react-dom';
import MealPrep from './MealPrep';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MealPrep />, div);
  ReactDOM.unmountComponentAtNode(div);
});
