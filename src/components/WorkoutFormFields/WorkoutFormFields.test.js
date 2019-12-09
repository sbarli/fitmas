import React from 'react';
import ReactDOM from 'react-dom';
import WorkoutFormFields from './WorkoutFormFields';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WorkoutFormFields />, div);
  ReactDOM.unmountComponentAtNode(div);
});
