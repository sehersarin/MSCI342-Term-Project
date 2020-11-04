import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, queryByAttribute } from '@testing-library/react';
import * as axios from 'axios';

import SignupForm from './SignUpForm';
import { BrowserRouter } from "react-router-dom";

jest.mock('axios');

describe('SignupForm component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  test('', () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>);
      const newValue = "Bob";

    // Act
    const getByName = queryByAttribute.bind(null, 'name');
    const firstNameInput = getByName(dom.container, 'first_name');
    fireEvent.change(firstNameInput, { target: { value: newValue } })

    //Assert
    expect(firstNameInput.value).toBe(newValue);
    // Expect that your state variable was changed

    console.log('dom', dom)
    //console.log('before', first_name.value);
    //console.log('after', first_name.value);
  });
});