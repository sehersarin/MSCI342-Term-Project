import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, getByTestId, getByDisplayValue } from '@testing-library/react';
import * as axios from 'axios';
import Selectable from "./Availability";
import ReactDOM from 'react-dom';
import moment from 'moment'
import { BrowserRouter } from "react-router-dom";

jest.mock('axios');

describe('Calendar component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  test("Should render without crashing", () => {
        const dom = render(
          <BrowserRouter>
            <Selectable />
          </BrowserRouter>);
  })

//   test('snapshot renders', () => {
//     const component = create(<BrowserRouter>
//       <Selectable />
//     </BrowserRouter>);
//     expect(component.toJSON()).toMatchSnapshot();
//   });

//   test("Testing case where user selects slot", async () => {
//     //Arrange
//     const dom = render(
//       <BrowserRouter>
//         <Selectable />
//       </BrowserRouter>);

//     const slot = getByDisplayValue(dom.container, "rbc-event");
//     //Act
//     window.confirm = jest.fn();
//     const expectedArg = 'delete entry?';
//     fireEvent.click(slot)
//     // fireEvent.change(date, { target: { value: '2020-11-25' } });
//     // fireEvent.click(submit)

//     //Assert
//     expect(window.confirm).toHaveBeenCalledWith(expectedArg);
//   })

  test("Testing case where user presses submit", async () => {
    //Arrange
    const dom = render(
      <BrowserRouter>
        <Selectable />
      </BrowserRouter>);

    const submit = getByDisplayValue(dom.container, "Add Availability")  
    //Act
    window.alert = jest.fn();
    const expectedArg = "Your times entries are placed";
    fireEvent.click(submit);
    //Assert
    expect(window.alert).toHaveBeenCalledWith(expectedArg);
  })

});