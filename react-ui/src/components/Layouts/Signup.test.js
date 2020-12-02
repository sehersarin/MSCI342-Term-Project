import React from "react";
import { BrowserRouter } from "react-router-dom";
import { create } from "react-test-renderer";
import Signup from "./Signup";

describe('Signup Snapshot', () => {
  test('snapshot renders', () => {
    const component = create(
    <BrowserRouter>
    <Signup />
    </BrowserRouter>);
    expect(component.toJSON()).toMatchSnapshot();
  });

});