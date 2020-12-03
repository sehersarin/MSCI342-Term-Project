import React from "react";
import { render, cleanup, fireEvent, queryByAttribute, getByDisplayValue, getByPlaceholderText} from '@testing-library/react';
import * as axios from 'axios';
import WorkerInputPage from './WorkerInputpage';
import { BrowserRouter } from "react-router-dom";
import _ from 'lodash';


jest.mock('axios');

describe('WorkerInputPage component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  //testing worker input 
  test('testing valid input for API call', async () => { 
    //Arrange
    const dom = render(
      <BrowserRouter>
        <WorkerInputPage />
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

    const resp = { data: testWorker }
    await axios.get.mockImplementation(() => Promise.resolve(resp));

    // Act
    window.alert = jest.fn();

    //Assert
    expect(axios.get).toHaveBeenCalled();
  });

});