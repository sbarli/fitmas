import React from 'react';
import ReactDOM from 'react-dom';
import ViewItemRow from './ViewItemRow';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ViewItemRow />, div);
  ReactDOM.unmountComponentAtNode(div);
});
