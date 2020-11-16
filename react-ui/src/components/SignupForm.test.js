import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, queryByAttribute, getByDisplayValue } from '@testing-library/react';
import * as axios from 'axios';

import SignupForm from './SignUpForm';
import { BrowserRouter } from "react-router-dom";
import { last } from "lodash";

jest.mock('axios');


describe('SignupForm component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  test('first name input in signup form', () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>);
      const newValue = "Bob";

    // Act
    const getByName = queryByAttribute.bind(null, 'name');
    const firstNameInput = getByName(dom.container, 'firstName');
    fireEvent.change(firstNameInput, { target: { value: newValue } })

    //Assert
    expect(firstNameInput.value).toBe(newValue);

    //console.log('dom', this.state);
    //console.log('before', firstName.value);
    //console.log('after', firstName.value);
  });
  
  test('last name input in signup form', () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>);
      const newValue = "World";

    // Act
    const getByName = queryByAttribute.bind(null, 'name');
    const lastNameInput = getByName(dom.container, 'lastName');
    fireEvent.change(lastNameInput, { target: { value: newValue } })

    //Assert
    expect(lastNameInput.value).toBe(newValue);
    // console.log('before', lastNameInput.value);
    // console.log('after', lastNameInput.value);
    
  });
  
  test('email input in signup form', () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>);
      const newValue = "helloworld@gmail.com";

    // Act
    const getByName = queryByAttribute.bind(null, 'name');
    const emailInput = getByName(dom.container, 'email');
    fireEvent.change(emailInput, { target: { value: newValue } })

    //Assert
    expect(emailInput.value).toBe(newValue);
  });

  test('phone input in signup form', () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>);
      const newValue = "4169900909";

    // Act
    const getByName = queryByAttribute.bind(null, 'name');
    const phoneInput = getByName(dom.container, 'phone');
    fireEvent.change(phoneInput, { target: { value: newValue } })

    //Assert
    expect(phoneInput.value).toBe(newValue);
    
  });
  
  test('password input in signup form', () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>);
      const newValue = "123456789";

    // Act
    const getByName = queryByAttribute.bind(null, 'name');
    const passwordInput = getByName(dom.container, 'password');
    fireEvent.change(passwordInput, { target: { value: newValue } })

    //Assert
    expect(passwordInput.value).toBe(newValue);
  });
});