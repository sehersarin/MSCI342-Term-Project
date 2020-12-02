import React from "react";
import { BrowserRouter } from "react-router-dom";
import { create } from "react-test-renderer";
import Dashboard from './Dashboard';

describe('Dashboard Snapshot', () => {
  test('snapshot renders', () => {
    const component = create(
    <BrowserRouter>
    <Dashboard />
    </BrowserRouter>  );
    expect(component.toJSON()).toMatchSnapshot();
  });
});