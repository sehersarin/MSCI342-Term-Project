import React from "react";
import { create } from "react-test-renderer";
import { render, cleanup, fireEvent, queryByAttribute, getByDisplayValue, getByPlaceholderText} from '@testing-library/react';
import * as axios from 'axios';
import CreateAppointmentForm from "./CreateAppointmentForm";
import ReactDOM from 'react-dom';
import moment from 'moment'
import { BrowserRouter } from "react-router-dom";
import TestRenderer from 'react-test-renderer';

jest.mock('axios');

describe('Check boop appointment component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

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
        < SelectWorkerForm user={nullUser}/>
      </BrowserRouter>);
    } catch (err) {
      isThrown = true;
    }

    // Assert
    expect(isThrown).toBe(true);
  });


});