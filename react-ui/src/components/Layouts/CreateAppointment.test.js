import React from "react";
import { create } from "react-test-renderer";
import CreateAppointment from './CreateAppointment';
import { BrowserRouter } from "react-router-dom";

describe('Profile Snapshot', () => {
  test('snapshot renders', () => {
    const component = create(<BrowserRouter>
      < CreateAppointment/>
    </BrowserRouter>);
    expect(component.toJSON()).toMatchSnapshot();
  });

});
