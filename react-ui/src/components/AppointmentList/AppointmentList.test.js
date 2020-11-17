import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup } from '@testing-library/react';
import * as axios from 'axios';

import AppointmentList from './AppointmentList';

jest.mock('axios');

describe('AppointmentList component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  test('no props are passed in', () => {
    // Arrange
    var isThrown = false;

    // Act
    try {
      const component = create(<AppointmentList />);
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
      const component = create(<AppointmentList user={nullUser} />);
    } catch (err) {
      isThrown = true;
    }

    // Assert
    expect(isThrown).toBe(true);
  });

  test('valid props are passed in with null response from api', () => {
    // Arrange
    const testUser = {
      userType: 'student',
      personId: '12345678',
      accessToken: 'XcCa92ZvOnQKZsGtOKOa',
    };
    const resp = { data: null };
    const emptyAppointmentList = { type: 'h3', props: {}, children: ['No Upcoming Appointments!'] };

    // Act
    axios.get.mockImplementation(() => Promise.resolve(resp));
    const component = create(<AppointmentList user={testUser} />);

    // Assert
    expect(component.toJSON()).toMatchObject(emptyAppointmentList);
  });

  test('valid props are passed in with an error in the api response', () => {
    // Arrange
    const testUser = {
      userType: 'student',
      personId: '12345678',
      accessToken: 'XcCa92ZvOnQKZsGtOKOa',
    };
    const resp = { data: null, error: "Unknown error occurred!" };
    const emptyAppointmentList = { type: 'h3', props: {}, children: ['No Upcoming Appointments!'] };

    // Act
    axios.get.mockImplementation(() => Promise.resolve(resp));
    const component = create(<AppointmentList user={testUser} />);

    // Assert
    expect(component.toJSON()).toMatchObject(emptyAppointmentList);
  });

  test('valid student props are passed in with empty array from api', () => {
    // Arrange
    const studentUser = {
      userType: 'student',
      personId: '12345678',
      accessToken: 'XcCa92ZvOnQKZsGtOKOa',
    };
    const resp = { data: [] };
    const emptyAppointmentList = { type: 'h3', props: {}, children: ['No Upcoming Appointments!'] };

    // Act
    axios.get.mockImplementation(() => Promise.resolve(resp));
    const component = create(<AppointmentList user={studentUser} />);

    // Assert
    expect(component.toJSON()).toMatchObject(emptyAppointmentList);
  });

  test('valid worker props are passed in with empty array from api', () => {
    // Arrange
    const workerUser = {
      userType: 'worker',
      personId: '8000000',
      accessToken: 'eeJAQr3wEC6CJZROFJTY',
    };
    const resp = { data: [] };
    const emptyAppointmentList = { type: 'h3', props: {}, children: ['No Upcoming Appointments!'] };

    // Act
    axios.get.mockImplementation(() => Promise.resolve(resp));
    const component = create(<AppointmentList user={workerUser} />);

    // Assert
    expect(component.toJSON()).toMatchObject(emptyAppointmentList);
  });

  test('valid student props and nonempty array of appointments from api', async () => {
    // Arrange
    const studentUser = {
      userType: 'student',
      personId: '12345678',
      accessToken: 'XcCa92ZvOnQKZsGtOKOa',
    };

    const appointmentDetails = [
      {
        appointmentId: 1,
        worker: {
          firstName: 'Tyler',
          lastName: 'Evans',
        },
        date: '2020-11-05',
        startTime: '08:00:00',
        endTime: '08:30:00',
        status: 'upcoming',
      },
      {
        appointmentId: 2,
        worker: {
          firstName: 'Joshua',
          lastName: 'Brooks',
        },
        date: '2020-11-07',
        startTime: '08:30:00',
        endTime: '09:00:00',
        status: 'upcoming',
      },
    ];
    const resp = { data: appointmentDetails };

    axios.get.mockImplementation(() => Promise.resolve(resp));

    // Act
    const { container } = render(<AppointmentList user={studentUser} />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled())

    // Assert
    expect(container.innerHTML.includes("Joshua Brooks")).toBe(true);
  });

  test('valid worker props and nonempty array of appointments from api', async () => {
    // Arrange
    const workerUser = {
      userType: 'worker',
      personId: '8000000',
      accessToken: 'eeJAQr3wEC6CJZROFJTY',
    };

    const appointmentDetails = [
      {
        appointmentId: 1,
        student: {
          firstName: 'John',
          lastName: 'Doe',
        },
        date: '2020-11-05',
        startTime: '08:00:00',
        endTime: '08:30:00',
        status: 'upcoming',
      },
      {
        appointmentId: 3,
        student: {
          firstName: 'Jane',
          lastName: 'Smith',
        },
        date: '2020-11-05',
        startTime: '08:30:00',
        endTime: '09:00:00',
        status: 'upcoming',
      },
    ];

    const resp = { data: appointmentDetails };

    axios.get.mockImplementation(() => Promise.resolve(resp));

    // Act
    const { container } = render(<AppointmentList user={workerUser} />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled())

    // Assert
    expect(container.innerHTML.includes("John Doe")).toBe(true);
  });


});
