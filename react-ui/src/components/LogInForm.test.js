import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, queryByAttribute, getByDisplayValue, getByPlaceholderText,screen } from '@testing-library/react';
import * as axios from 'axios';
import { BrowserRouter } from "react-router-dom";
import { last } from "lodash";
import LogInForm from "./LogInForm";
import queryString from 'query-string'
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom';

jest.mock('axios');


describe('SignupForm component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

/*    test('testing valid email and invalid password', async() => {
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
    expect(window.alert).toHaveBeenCalledWith(expectedArg); 
    
  });  */
  
  test('testing valid email and valid password', async() => {
    //Arrange
    const dom = render(
        <BrowserRouter>
          <LogInForm />
        </BrowserRouter>);
    const email = getByPlaceholderText(dom.container,'email');
    const password = getByPlaceholderText(dom.container,'password');
    const submit = getByDisplayValue(dom.container,"Log In!");
    const resp = { email: 'joshuabrooks@gmail.com', password: 'j1234' }
    axios.get.mockImplementation(() => Promise.resolve(resp));
   
    // Act
    window.alert = jest.fn();
    fireEvent.change(email, { target: { value: 'joshuabrooks@gmail.com' } });
    fireEvent.change(password, { target: { value: 'j1234' } });
    fireEvent.click(submit);
    
    //Assert
    expect(axios.get).toHaveBeenCalledTimes(1);
  });    

  /*  test('testing valid email and invalid password', async() => {
    //Arrange
    const testRenderer = TestRenderer.create(
    <BrowserRouter>
      <LogInForm />
    </BrowserRouter>);
    const expectedArg = "Invalid Email or Password";
    const resp = { email: 'joshuabrooks@gmail.com', password: 'post' }
    axios.get.mockImplementation(() => Promise.resolve(resp));
    window.alert = jest.fn();
    // Act
    
    const testInstance = testRenderer.root;
    ReactDOM.createPortal = node => node;
    testInstance.findByProps({placeholder: "email"}).props.onChange({target:{value:"joshuabrooks@gmail.com" }})
    testInstance.findByProps({placeholder: "password"}).props.onChange({target:{value:"post" }})
    await testInstance.findByProps({className:"LogInForm"}).props.onSubmit({ preventDefault: () => { } })
    //Assert
    expect(window.alert).toHaveBeenCalledWith(expectedArg); 
    
  });     */

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

  test('testing invalid email', () => {
    //Arrange
    const dom = render(
        <BrowserRouter>
          <LogInForm />
        </BrowserRouter>);
    const email = getByPlaceholderText(dom.container,'email');
    const password = getByPlaceholderText(dom.container,'password');
    const submit = getByDisplayValue(dom.container,"Log In!");
    const Email = 'joshuabrooks@gmail.c'
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

})