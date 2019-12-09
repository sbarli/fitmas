import React from 'react';
import ReactDOM from 'react-dom';
import MealFormFields from './MealFormFields';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MealFormFields />, div);
  ReactDOM.unmountComponentAtNode(div);
});
