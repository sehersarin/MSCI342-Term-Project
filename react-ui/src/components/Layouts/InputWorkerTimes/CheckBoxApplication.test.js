import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, getByTestId, getByDisplayValue } from '@testing-library/react';
import * as axios from 'axios';
import Check from "./CheckboxApplication";
import ReactDOM from 'react-dom';
import moment from 'moment'
import { BrowserRouter } from "react-router-dom";

jest.mock('axios');

describe('Checkbox component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  test("Should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter>
      <Check />
    </BrowserRouter>, div)
  })

  test('snapshot renders', () => {
    const component = create(<BrowserRouter>
      <Check />
    </BrowserRouter>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("test api rendering", async () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <Check />
      </BrowserRouter>);

    const timeslots = [{ slotId: 1, startTime: "08:00:00", endTime: "08:30:00" },
    { slotId: 2, startTime: "08:30:00", endTime: "09:00:00" },
    { slotId: 3, startTime: "09:00:00", endTime: "09:30:00" },
    { slotId: 4, startTime: "09:30:00", endTime: "10:00:00" },
    { slotId: 5, startTime: "10:00:00", endTime: "10:30:00" },
    { slotId: 6, startTime: "10:30:00", endTime: "11:00:00" },
    { slotId: 7, startTime: "11:00:00", endTime: "11:30:00" },
    { slotId: 8, startTime: "11:30:00", endTime: "12:00:00" },
    { slotId: 9, startTime: "12:00:00", endTime: "12:30:00" },
    { slotId: 10, startTime: "12:30:00", endTime: "13:00:00" },
    { slotId: 11, startTime: "13:00:00", endTime: "13:30:00" },
    { slotId: 12, startTime: "13:30:00", endTime: "14:00:00" },
    { slotId: 13, startTime: "14:00:00", endTime: "14:30:00" },
    { slotId: 14, startTime: "14:30:00", endTime: "15:00:00" },
    { slotId: 15, startTime: "15:00:00", endTime: "15:30:00" }]
    //const params = { accessToken: "XcCa92ZvOnQKZsGtOKOa" }

    //Act
    const resp = { data: timeslots }
    await axios.get.mockImplementation(() => Promise.resolve(resp));

    //Assert
    expect(axios.get).toHaveBeenCalled();
  })


  test("Testing case where user only select a checkbox", async () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <Check />
      </BrowserRouter>);

    const checkbox = getByDisplayValue(dom.container, "100");
    const submit = getByDisplayValue(dom.container, "Add Availability")
    const date = getByDisplayValue(dom.container, "")

    const timeslots = [{ slotId: 1, startTime: "08:00:00", endTime: "08:30:00" },
    { slotId: 2, startTime: "08:30:00", endTime: "09:00:00" },
    { slotId: 3, startTime: "09:00:00", endTime: "09:30:00" },
    { slotId: 4, startTime: "09:30:00", endTime: "10:00:00" },
    { slotId: 5, startTime: "10:00:00", endTime: "10:30:00" },
    { slotId: 6, startTime: "10:30:00", endTime: "11:00:00" },
    { slotId: 7, startTime: "11:00:00", endTime: "11:30:00" },
    { slotId: 8, startTime: "11:30:00", endTime: "12:00:00" },
    { slotId: 9, startTime: "12:00:00", endTime: "12:30:00" },
    { slotId: 10, startTime: "12:30:00", endTime: "13:00:00" },
    { slotId: 11, startTime: "13:00:00", endTime: "13:30:00" },
    { slotId: 12, startTime: "13:30:00", endTime: "14:00:00" },
    { slotId: 13, startTime: "14:00:00", endTime: "14:30:00" },
    { slotId: 14, startTime: "14:30:00", endTime: "15:00:00" },
    { slotId: 15, startTime: "15:00:00", endTime: "15:30:00" }]
    //const params = { accessToken: "XcCa92ZvOnQKZsGtOKOa" }

    //Act
    window.alert = jest.fn();
    const resp = { data: timeslots }
    const expectedArg = "Please select timeslot(s)";
    await axios.get.mockImplementation(() => Promise.resolve(resp));
    fireEvent.click(checkbox)
    fireEvent.change(date, { target: { value: '2020-11-25' } });
    fireEvent.click(submit)


    //Assert
    expect(window.alert).toHaveBeenCalledWith(expectedArg);
  })

  test("Testing case where date isn't select", async () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <Check />
      </BrowserRouter>);

    const checkbox = getByDisplayValue(dom.container, "100");
    const submit = getByDisplayValue(dom.container, "Add Availability")


    const timeslots = [{ slotId: 1, startTime: "08:00:00", endTime: "08:30:00" },
    { slotId: 2, startTime: "08:30:00", endTime: "09:00:00" },
    { slotId: 3, startTime: "09:00:00", endTime: "09:30:00" },
    { slotId: 4, startTime: "09:30:00", endTime: "10:00:00" },
    { slotId: 5, startTime: "10:00:00", endTime: "10:30:00" },
    { slotId: 6, startTime: "10:30:00", endTime: "11:00:00" },
    { slotId: 7, startTime: "11:00:00", endTime: "11:30:00" },
    { slotId: 8, startTime: "11:30:00", endTime: "12:00:00" },
    { slotId: 9, startTime: "12:00:00", endTime: "12:30:00" },
    { slotId: 10, startTime: "12:30:00", endTime: "13:00:00" },
    { slotId: 11, startTime: "13:00:00", endTime: "13:30:00" },
    { slotId: 12, startTime: "13:30:00", endTime: "14:00:00" },
    { slotId: 13, startTime: "14:00:00", endTime: "14:30:00" },
    { slotId: 14, startTime: "14:30:00", endTime: "15:00:00" },
    { slotId: 15, startTime: "15:00:00", endTime: "15:30:00" }]
    //const params = { accessToken: "XcCa92ZvOnQKZsGtOKOa" }

    //Act
    window.alert = jest.fn();
    const resp = { data: timeslots }
    const expectedArg = "No date has been selected, please selected a date";
    await axios.get.mockImplementation(() => Promise.resolve(resp));
    fireEvent.click(checkbox)
    fireEvent.click(submit)


    //Assert
    expect(window.alert).toHaveBeenCalledWith(expectedArg);
  })

  test("Testing valid input where everything is selected", async () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <Check />
      </BrowserRouter>);

    const checkbox = getByDisplayValue(dom.container, "100");
    const submit = getByDisplayValue(dom.container, "Add Availability")


    const timeslots = [{ slotId: 1, startTime: "08:00:00", endTime: "08:30:00" },
    { slotId: 2, startTime: "08:30:00", endTime: "09:00:00" },
    { slotId: 3, startTime: "09:00:00", endTime: "09:30:00" },
    { slotId: 4, startTime: "09:30:00", endTime: "10:00:00" },
    { slotId: 5, startTime: "10:00:00", endTime: "10:30:00" },
    { slotId: 6, startTime: "10:30:00", endTime: "11:00:00" },
    { slotId: 7, startTime: "11:00:00", endTime: "11:30:00" },
    { slotId: 8, startTime: "11:30:00", endTime: "12:00:00" },
    { slotId: 9, startTime: "12:00:00", endTime: "12:30:00" },
    { slotId: 10, startTime: "12:30:00", endTime: "13:00:00" },
    { slotId: 11, startTime: "13:00:00", endTime: "13:30:00" },
    { slotId: 12, startTime: "13:30:00", endTime: "14:00:00" },
    { slotId: 13, startTime: "14:00:00", endTime: "14:30:00" },
    { slotId: 14, startTime: "14:30:00", endTime: "15:00:00" },
    { slotId: 15, startTime: "15:00:00", endTime: "15:30:00" }]
    //const params = { accessToken: "XcCa92ZvOnQKZsGtOKOa" }
    const timeslot1 = getByDisplayValue(dom.asFragment(), "1");
    const date = getByDisplayValue(dom.container, "")
    //Act
    window.alert = jest.fn();
    const resp = { data: timeslots }
    const expectedArg = "Input is added";
    await axios.get.mockImplementation(() => Promise.resolve(resp));
    fireEvent.click(checkbox)
    fireEvent.click(timeslot1)
    fireEvent.change(date, { target: { value: '2020-11-25' } });
    fireEvent.click(submit)


    //Assert
    expect(window.alert).toHaveBeenCalledWith(expectedArg);
  })

});
