import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, getByTestId, getByDisplayValue } from '@testing-library/react';
import * as axios from 'axios';
import Check from "./CheckboxApplication";
import ReactDOM from 'react-dom';
import moment from 'moment'
import { BrowserRouter } from "react-router-dom";

jest.mock('axios');

describe('Checkbox select worker component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  test("Should render select worker without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter>
      <Check />
    </BrowserRouter>, div)
  })

  test("test api for workers given schoolId rendering", async () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <Check />
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
          <Check />
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

    test("Testing valid input where a worker is selected", async () => {
      //Arrange
      const dom = render(
        <BrowserRouter>
          <Check />
        </BrowserRouter>);
  
      const  schoolId = 1;

      //everything below must be changed

      const date = getByDisplayValue(dom.container, "")
      const recurring = getByDisplayValue(dom.container, "100");
      const submit = getByDisplayValue(dom.container, "Add Availability")
  
      //Act
      window.alert = jest.fn();
      const resp = { data: schoolId }
      const expectedArg = "Input is added";
      await axios.get.mockImplementation(() => Promise.resolve(resp));
      const checkbox = getByDisplayValue(dom.container, "1");
      fireEvent.click(checkbox)
      fireEvent.click(recurring)
      fireEvent.change(date, { target: { value: '2020-11-25' } });
      fireEvent.click(submit)
  
      //Assert
      expect(window.alert).toHaveBeenCalledWith(expectedArg);
    })

  });


