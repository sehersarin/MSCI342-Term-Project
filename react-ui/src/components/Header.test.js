import React from "react";
import { create } from "react-test-renderer";
import { render, getByTestId} from '@testing-library/react';


import Header from './Header';

describe('Header', () => {
  test('snapshot renders', () => {
    const component = create(<Header />);
    expect(component.toJSON()).toMatchSnapshot();
  });

});