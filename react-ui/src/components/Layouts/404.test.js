import React from "react";
import { create } from "react-test-renderer";
import NotFound from './404';

describe('404 Snapshot', () => {
  test('snapshot renders', () => {
    const component = create(<NotFound />);
    expect(component.toJSON()).toMatchSnapshot();
  });

});