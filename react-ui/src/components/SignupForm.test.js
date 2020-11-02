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

});