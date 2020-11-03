import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent } from '@testing-library/react';
import * as axios from 'axios';
import Check from "./CheckboxApplication";
import ReactDOM from 'react-dom';

jest.mock('axios');

describe('Checkbox component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  test("Should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Check></Check>, div)
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

  /*  test('Should capture day checkbox ticked correctly onChange', function() {
     // Arrange
    const component = create(<Check/>)
    const input = component.find('input').at(1);
 
    //Act
     input.instance().isChecked = true;
     input.simulate('change');
 
     // Assert
     expect(component.state().subscribed).toEqual(true);
   });
  */

  /*   test('Renders header for checkbox form', ()=> {
      //Arrange
      const wrap = create(<Check />)
  
      //Act
      const Title=  <h1>Recurring on</h1>
  
      //Assert
      expect(wrap.contains(Title)).toEqual(true);
    })
   */

  /*  test('Test submit button with a checkbox checked', ()=>{
     //Arrange
    const state = {id: '1', isChecked: true}
    const expectedArg = "No date has been selected, please selected a date";
    const component = create(<Check/>);
  
    //Act
    window.alert = jest.fn();
    component.setState(state)
  
    //Assert
    component.getInstance(<Check/>).simulate('submit')
    expect(window.alert).toHaveBeenCalledWith(expectedArg);
   })
   */

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
    expect(checkbox.checked).toEqual(false)
    fireEvent.click(checkbox)
    fireEvent.click(checkbox)

    //Assert
    expect(checkbox.checked).toEqual(false)
  })

  test("Date input is initally set to nothing", () => {
    //Arrange
    const { getByTestId} = render(<Check />);
    const DateBox = getByTestId("DATE");

    //Act

    //Assert
    expect(DateBox.toBe(" "));
  })




});
