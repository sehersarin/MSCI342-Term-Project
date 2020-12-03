import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, queryByAttribute, getByDisplayValue, getByPlaceholderText, screen, getByText, queryByPlaceholderText, queryByDisplayValue } from '@testing-library/react';
import * as axios from 'axios';
import { BrowserRouter } from "react-router-dom";
import { last } from "lodash";
import LogInForm from "./LogInForm";
import queryString from 'query-string'
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Dashboard from "./Dashboard/Dashboard"
import { Redirect, Route, withRouter, Link } from "react-router-dom";

jest.mock('axios');


describe('LoginForm component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  test('testing valid email and invalid password', async () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>);
    const email = getByPlaceholderText(dom.container, 'email');
    const password = getByPlaceholderText(dom.container, 'password');
    const submit = getByDisplayValue(dom.container, "Log In!");
    const expectedArg = "Invalid Email or Password";
    const resp = { email: 'joshuabrooks@gmail.com', password: 'post' }
    await axios.get.mockImplementation(() => Promise.resolve(resp));

    // Act
    window.alert = jest.fn();
    fireEvent.change(email, { target: { value: 'joshuabrooks@gmail.com' } });
    fireEvent.change(password, { target: { value: 'post' } });
    fireEvent.click(submit);

    //Assert
    await axios.get
    expect(window.alert).toHaveBeenCalledWith(expectedArg);

  });

  test('testing valid input for API call', async () => { // cover lines
    //Arrange
    const dom = render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>);

    const testWorker = [{
      accessToken: "eeJAQr3wEC6CJZROFJTY",
      email: "joshuabrooks@gmail.com",
      firstName: "Joshua",
      islogged: true,
      password: 'j1234',
      userType: "worker",
      workerId: 8000000
    }]
  
    const email = getByPlaceholderText(dom.container, 'email');
    const password = getByPlaceholderText(dom.container, 'password');
    const submit = getByDisplayValue(dom.container, "Log In!");
    const resp = { data: testWorker }
    await axios.get.mockImplementation(() => Promise.resolve(resp));

    // Act
    window.alert = jest.fn();
    fireEvent.change(email, { target: { value: 'joshuabrooks@gmail.com' } });
    fireEvent.change(password, { target: { value: 'j1234' } });
    fireEvent.click(submit);

    //Assert
    expect(axios.get).toHaveBeenCalled();
  });

  test('testing inputting email and password', () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>);
    const email = getByPlaceholderText(dom.container, 'email');
    const password = getByPlaceholderText(dom.container, 'password');
    const userEmail = 'joshuabrooks@gmail.com'
    const userPassword = 'j1234'
    // Act
    fireEvent.change(email, { target: { value: userEmail } });
    fireEvent.change(password, { target: { value: userPassword } });

    //Assert
    expect(email.value).toBe(userEmail);
    expect(password.value).toBe(userPassword);
  });

  test('testing edge case invalid email', () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>);
    const email = getByPlaceholderText(dom.container, 'email');
    const password = getByPlaceholderText(dom.container, 'password');
    const submit = getByDisplayValue(dom.container, "Log In!");
    const userEmail = 'joshuabrooks@gmail.c'
    const userPassword = 'j1234'
    const expectedArg = "You have entered an invalid email address!";
    // Act
    window.alert = jest.fn();
    fireEvent.change(email, { target: { value: userEmail } });
    fireEvent.change(password, { target: { value: userPassword } });
    fireEvent.click(submit);

    //Assert
    expect(window.alert).toHaveBeenCalledWith(expectedArg);
  });

  test('testing another edge case invalid email', () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>);
    const email = getByPlaceholderText(dom.container, 'email');
    const password = getByPlaceholderText(dom.container, 'password');
    const submit = getByDisplayValue(dom.container, "Log In!");
    const Email = 'dasfsdf@fsdfsaf'
    const Password = 'j1234'
    const expectedArg = "You have entered an invalid email address!";
    // Act
    window.alert = jest.fn();
    fireEvent.change(email, { target: { value: Email } });
    fireEvent.change(password, { target: { value: Password } });
    fireEvent.click(submit);

    //Assert
    expect(window.alert).toHaveBeenCalledWith(expectedArg);
  });

  test('testing no password input', () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>);
    const email = getByPlaceholderText(dom.container, 'email');
    const password = getByPlaceholderText(dom.container, 'password');
    const submit = getByDisplayValue(dom.container, "Log In!");
    const Email = 'joshuabrooks@gmail.com'
    // Act
    fireEvent.change(email, { target: { value: Email } });
    fireEvent.click(submit);

    //Assert
    expect(password.required).toBe(true)
  });

  test('testing no email input', () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>);
    const email = getByPlaceholderText(dom.container, 'email');
    const password = getByPlaceholderText(dom.container, 'password');
    const submit = getByDisplayValue(dom.container, "Log In!");
    // Act
    fireEvent.change(password, { target: { value: 'j1234' } });
    fireEvent.click(submit);

    //Assert
    expect(email.required).toBe(true)
  });

})