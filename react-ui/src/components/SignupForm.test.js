import React from "react";
import { create } from "react-test-renderer";
import { render, cleanup, fireEvent, queryByAttribute, getByDisplayValue, getByPlaceholderText} from '@testing-library/react';
import * as axios from 'axios';
import SignupForm from './SignUpForm';
import { BrowserRouter } from "react-router-dom";
import { last } from "lodash";
import queryString from 'query-string'
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import _ from 'lodash';


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

  test('testing valid input for API call', async () => { 
    const dom = render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>);

    const testWorker = [{
      accessToken: "eeJAQr3wEC6CJZROFJTY",
      email: "joshuabrooks@gmail.com",
      firstName: "Joshua",
      lastName: "Brooks",
      isSubmitted: true,
      password: 'j1234',
      userType: "worker",
      workerId: 8000000
    }]

    const firstName = getByPlaceholderText(dom.container, 'Enter First Name*');
    const lastName = getByPlaceholderText(dom.container, 'Enter Last Name*');
    const personId = getByPlaceholderText(dom.container, 'Enter Student or Worker ID*');
    const email = getByPlaceholderText(dom.container, 'Enter Email Address*');
    const password = getByPlaceholderText(dom.container, 'Enter Password*');
    const submit = getByDisplayValue(dom.container, "Submit!");
    const resp = { data: testWorker }
    await axios.get.mockImplementation(() => Promise.resolve(resp));

    // Act
    window.alert = jest.fn();
    fireEvent.change(firstName, { target: { value: 'Joshua' } });
    fireEvent.change(lastName, { target: { value: 'Brooks' } });
    fireEvent.change(personId, { target: { value: '8000000' } });
    fireEvent.change(email, { target: { value: 'joshuabrooks@gmail.com' } });
    fireEvent.change(password, { target: { value: 'j1234' } });
    fireEvent.click(submit);

    //Assert
    expect(axios.get).toHaveBeenCalled();
  }); 
});