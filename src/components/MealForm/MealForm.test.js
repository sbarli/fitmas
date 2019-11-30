import React from 'react';
import ReactDOM from 'react-dom';
import MealForm from './MealForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MealForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
