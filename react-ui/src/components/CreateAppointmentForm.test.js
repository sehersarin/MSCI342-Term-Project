import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, getByTestId, getByDisplayValue } from '@testing-library/react';
import * as axios from 'axios';
import CreateAppointmentForm from "./CreateAppointmentForm";
import ReactDOM from 'react-dom';
import moment from 'moment'
import { BrowserRouter } from "react-router-dom";

jest.mock('axios');

describe('Check select worker component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });
  
  //TODO edit
  /*
  test('reason input in book app form', () => {
    //Arrange
    const studentUser = {
      email: "johndoe@gmail.com",
      schoolId: "1",
      userType: 'student',
      personId: '12345678',
      accessToken: 'XcCa92ZvOnQKZsGtOKOa',
    };

    const dom = render(
      <BrowserRouter>
        <CreateAppointmentForm user={studentUser} />
      </BrowserRouter>);
    const newValue = "Reason";

    // Act
    const getByName = queryByAttribute.bind(null, 'name');
    const reasonInput = getByName(dom.container, 'reason');
    fireEvent.change(reasonInput, { target: { value: newValue } })

    //Assert
    expect(reasonInput.value).toBe(newValue);
  });
*/

 test('no props are passed in', () => {
  // Arrange
  var isThrown = false;

  // Act
  try {
    const component = create(<BrowserRouter>
      <CreateAppointmentForm />
    </BrowserRouter>);
  } catch (err) {
    isThrown = true;
  }

  // Assert
  expect(isThrown).toBe(true);
});

test('null value for prop is passed in', () => {
  // Arrange
  const nullUser = null;
  var isThrown = false;

  // Act
  try {
    const component = create(<BrowserRouter>
      <CreateAppointmentForm user={nullUser}/>
    </BrowserRouter>);
  } catch (err) {
    isThrown = true;
  }

  // Assert
  expect(isThrown).toBe(true);
});



});