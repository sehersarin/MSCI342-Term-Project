import React from "react";
import { create } from "react-test-renderer";
import Home from './Home';

describe('Home Snapshot', () => {
  test('snapshot renders', () => {
    const component = create(<Home />);
    expect(component.toJSON()).toMatchSnapshot();
  });

});