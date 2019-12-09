import React from 'react';
import { Form } from 'react-final-form';
import PropTypes from 'prop-types';
// components
import Header from '../../libs/ui/Header/Header';
import Button from '../../libs/ui/Button/Button';
import Input from '../../libs/ui/forms/Input/Input';

// styled components
import styled from 'styled-components/macro';
const Wrapper = styled.div``;

const Login = ({ username, onSubmit }) => {
  return (
    <Wrapper>
      <Header size="h2" center>
        Please enter your username to continue:
      </Header>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Input
                name="username"
                label="Username"
                value={username}
                placeholder="myDopeUsername"
              />
              <Button type="submit" theme="green">Submit</Button>
            </form>
          )
        }}
      />
    </Wrapper>
  );
};

Login.propTypes = {
  username: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
