import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup } from '@testing-library/react';
import * as axios from 'axios';

import SignupForm from './SignUpForm';

jest.mock('axios');

describe('SignupForm component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });


  test('no props are passed in', () => {
    // Arrange
    var isThrown = false;

    // Act
    try {
      const component = create(<SignupForm />);
    } catch (err) {
      isThrown = true;
    }

    // Assert
    expect(isThrown).toBe(true);
  });

  test('null value for prop is passed in', () => {
    // Arrange
    const nullUser = null;
    var isThrown = false;

    // Act
    try {
      const component = create(<SignupForm user={nullUser} />);
    } catch (err) {
      isThrown = true;
    }

    // Assert
    expect(isThrown).toBe(true);
  });

});