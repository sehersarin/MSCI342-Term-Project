import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, getByTestId, getByDisplayValue } from '@testing-library/react';
import * as axios from 'axios';
import SelectWorkerForm from "./SelectWorkerForm";
import ReactDOM from 'react-dom';
import moment from 'moment'
import { BrowserRouter } from "react-router-dom";

jest.mock('axios');

describe('Check select worker component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  test("Should render select worker without crashing", () => {
    const div = document.createElement("div");
    const email = "johndoe@gmail.com";
      //userType: "student",
      //schoolId: "1",
      //personId: "12345678",
     // accessToken: "XcCa92ZvOnQKZsGtOKOa"
    ReactDOM.render(<BrowserRouter>
      <SelectWorkerForm />
    </BrowserRouter>, div)
  })

  test("test api for workers given schoolId rendering", async () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <SelectWorkerForm />
      </BrowserRouter>);

    const  schoolId = 1;

    //Act
    const resp = { data: schoolId }
    await axios.get.mockImplementation(() => Promise.resolve(resp));

    //Assert
    expect(axios.get).toHaveBeenCalled();
    })

    test("Testing case where a worker isn't select", async () => {
      //Arrange
      const dom = render(
        <BrowserRouter>
          <SelectWorkerForm />
        </BrowserRouter>);
  
      // const checkbox = getByDisplayValue(dom.container, "1");
      const submit = getByDisplayValue(dom.container, "Next")
  
      const  schoolId = 1;
  
      //Act
      window.alert = jest.fn();
      const resp = { data: schoolId }
      const expectedArg = "Please Select a Worker";
      await axios.get.mockImplementation(() => Promise.resolve(resp));
      // fireEvent.click(checkbox)
      fireEvent.click(submit)
  
  
      //Assert
      expect(window.alert).toHaveBeenCalledWith(expectedArg);
    })

  });


