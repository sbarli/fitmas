import React from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  height: 100vh;
  background: steelblue;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 0;
  padding-top: 5rem;
`;

const App = () => {
  return (
    <Wrapper>
      <header>
        <Title>Welcome to 25 Days of Fitmas!</Title>
      </header>
    </Wrapper>
  );
};

export default App;
