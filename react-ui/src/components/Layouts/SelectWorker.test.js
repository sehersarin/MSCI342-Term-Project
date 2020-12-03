import React from "react";
import { create } from "react-test-renderer";
import SelectWorker from './SelectWorker';
import { BrowserRouter } from "react-router-dom";

describe('Profile Snapshot', () => {
  test('snapshot renders', () => {
    const component = create(<BrowserRouter>
      < SelectWorker/>
    </BrowserRouter>);
    expect(component.toJSON()).toMatchSnapshot();
  });

});
