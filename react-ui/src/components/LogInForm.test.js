import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, queryByAttribute, getByDisplayValue, getByPlaceholderText,screen } from '@testing-library/react';
import * as axios from 'axios';
import { BrowserRouter } from "react-router-dom";
import { last } from "lodash";
import LogInForm from "./LogInForm";
import queryString from 'query-string'

jest.mock('axios');


describe('SignupForm component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

/*   test('testing valid email and password', () => {
    //Arrange
    const dom = render(
        <BrowserRouter>
          <LogInForm />
        </BrowserRouter>);
    const email = getByPlaceholderText(dom.container,'email');
    const password = getByPlaceholderText(dom.container,'password');
    const submit = getByDisplayValue(dom.container,'Log In!')
    
   
    // Act
    fireEvent.change(email, { target: { value: 'joshuabrooks@gmail.com' } });
    fireEvent.change(password, { target: { value: 'j1234' } });
    fireEvent.click(submit);
    //Assert
    expect(dom.container.innerHTML.includes('Joshua').toBe(true))

  }); */

   test('testing valid email and invalid password', async() => {
    //Arrange
    const dom = render(
        <BrowserRouter>
          <LogInForm />
        </BrowserRouter>);
    const email = getByPlaceholderText(dom.container,'email');
    const password = getByPlaceholderText(dom.container,'password');
    const submit = getByDisplayValue(dom.container,"Log In!");
    const expectedArg = "Invalid Email or Password";
    const resp = { email: 'joshuabrooks@gmail.com', password: 'post' }
    axios.get.mockImplementation(() => Promise.resolve(resp));
   
    // Act
    window.alert = jest.fn();
    fireEvent.change(email, { target: { value: 'joshuabrooks@gmail.com' } });
    fireEvent.change(password, { target: { value: 'post' } });
    fireEvent.click(submit);
    
    //Assert
    expect(axios.get).toHaveBeenCalledTimes(1);
   /*  expect(window.alert).toHaveBeenCalledWith(expectedArg);  */
    
  }); 

  test('testing inputting email and password', () => {
    //Arrange
    const dom = render(
        <BrowserRouter>
          <LogInForm />
        </BrowserRouter>);
    const email = getByPlaceholderText(dom.container,'email');
    const password = getByPlaceholderText(dom.container,'password');
    const Email = 'joshuabrooks@gmail.com'
    const Password = 'j1234'
    // Act
    fireEvent.change(email, { target: { value: Email } });
    fireEvent.change(password, { target: { value: Password } });

    //Assert
    expect(email.value).toBe(Email);
    expect(password.value).toBe(Password);
  }); 

})