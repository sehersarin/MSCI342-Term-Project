import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, getByTestId } from '@testing-library/react';
import * as axios from 'axios';
import Check from "./CheckboxApplication";
import ReactDOM from 'react-dom';
import moment from 'moment'

jest.mock('axios');

describe('Checkbox component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  test("Should render without crashing", () => {	
    const div = document.createElement("div");	
    ReactDOM.render(<Check/>, div)	
  })

  test('no props are passed in', () => {
    // Arrange
    var isThrown = false;

    // Act
    try {
      const component = create(<Check />);
    } catch (err) {
      isThrown = true;
    }

    // Assert
    expect(isThrown).toBe(false);
  });

  test('snapshot renders', () => {
    const component = create(<Check />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("checkbox changes state as it is checked/unchecked", () => {
    //Arrange
    const { getByDisplayValue } = render(<Check />);
    const checkbox = getByDisplayValue("1");

    //Act
    expect(checkbox.checked).toEqual(false)
    fireEvent.click(checkbox)

    //Assert
    expect(checkbox.checked).toEqual(true)
  })

  test("checkbox can be checked and unchecked", () => {
    //Arrange
    const { getByDisplayValue } = render(<Check />);
    const checkbox = getByDisplayValue("1");

    //Act
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    //Assert
    expect(checkbox.checked).toEqual(false);
  })

  test("multiple checkbox can be checked and unchecked", () => {
    //Arrange
    const { getByDisplayValue } = render(<Check />);
    const checkbox = getByDisplayValue("1");
    const checkbox2 = getByDisplayValue("2");

    //Act

    fireEvent.click(checkbox);
    fireEvent.click(checkbox2);

    //Assert
    expect(checkbox.checked).toEqual(true);
    expect(checkbox2.checked).toEqual(true);
  })

  test("submitting one checked box, no date selected", () => {
    //Arrange
    const { getByDisplayValue } = render(<Check />);
    const checkbox = getByDisplayValue("1");
    const expectedArg = "No date has been selected, please selected a date";
    const submit = getByDisplayValue("Done")
    //Act
    window.alert = jest.fn();
    fireEvent.click(checkbox);
    fireEvent.click(submit);

    //Assert
    expect(checkbox.checked).toEqual(true);
    expect(window.alert).toHaveBeenCalledWith(expectedArg);

  })

  test("submitting one checked box, and a date is selected", () => {
    //Arrange
    const { getByDisplayValue} = render(<Check />);
    const date = getByDisplayValue('');
    const checkbox = getByDisplayValue("1");
    const expectedArg = "Days has been selected";
    const submit = getByDisplayValue("Done")
    //Act
    window.alert = jest.fn();
    fireEvent.click(checkbox);
    fireEvent.change(date, { target: { value: '2020-01-15' } });
    fireEvent.click(submit);

    //Assert
    expect(checkbox.checked).toEqual(true);
    expect(window.alert).toHaveBeenCalledWith(expectedArg);

  })

  test("submitting no checked box, and a date is selected", () => {
    //Arrange
    const { getByDisplayValue} = render(<Check />);
    const date = getByDisplayValue('');
    const expectedArg = "No day has been checked, please selected a day";
    const submit = getByDisplayValue("Done")
    //Act
    window.alert = jest.fn();
    fireEvent.change(date, { target: { value: '2020-01-15' } });
    fireEvent.click(submit);

    //Assert
    expect(window.alert).toHaveBeenCalledWith(expectedArg);
  })

  
  test("submitting checkbox Tuesday, and a Monday is selected", () => { 
    //Arrange
    const { getByDisplayValue} = render(<Check />);
    const date = getByDisplayValue('');
    const checkbox = getByDisplayValue("2");
    const expectedArg = "Days has been selected";
    const submit = getByDisplayValue("Done")
    //Act
    window.alert = jest.fn();
    fireEvent.click(checkbox);
    fireEvent.change(date, { target: { value: '2020-11-02' } });
    fireEvent.click(submit);

    //Assert
    expect(checkbox.checked).toEqual(true);
    expect(window.alert).toHaveBeenCalledWith(expectedArg);

  })
 
});
