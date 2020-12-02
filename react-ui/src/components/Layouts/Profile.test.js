import React from "react";
import { create } from "react-test-renderer";
import Profile from './Profile';

describe('Profile Snapshot', () => {
  test('snapshot renders', () => {
    const component = create(<Profile />);
    expect(component.toJSON()).toMatchSnapshot();
  });

});