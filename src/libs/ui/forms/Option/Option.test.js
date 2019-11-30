import React from 'react';
import ReactDOM from 'react-dom';
import Option from './Option';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Option />, div);
  ReactDOM.unmountComponentAtNode(div);
});
