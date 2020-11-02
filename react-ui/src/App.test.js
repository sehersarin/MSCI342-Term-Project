import React from "react";
import { create } from "react-test-renderer";

import App from './App';

describe('App', () => {
  test('snapshot renders', () => {
    const component = create(<App />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
