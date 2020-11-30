import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup } from '@testing-library/react';
import * as axios from 'axios';
import TestRenderer from 'react-test-renderer';

import AppointmentList from './AppointmentList';

jest.mock('axios');

describe('rendering of list section of AppointmentList component', () => {
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
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Assert
    expect(container.innerHTML.includes("John Doe")).toBe(true);
  });

});

describe('rendering appointment cancellation popups', () => {
  test('cancel button cannot be clicked when there are no appointments', async () => {
    // Arrange
    var isThrown = false;
    const workerUser = {
      userType: 'worker',
      personId: '8000000',
      accessToken: 'eeJAQr3wEC6CJZROFJTY',
    };

    // Act
    try {
      const testRenderer = TestRenderer.create(<AppointmentList user={workerUser} />);
      const testInstance = testRenderer.root;

      // Waits for the axios to be called before attempting to find the cancel button.
      await waitFor(() => expect(axios.get).toHaveBeenCalled());
      testInstance.findByProps({ className: "cancel-btn" }).props.onClick();
    } catch (err) {
      isThrown = true;
    }

    // Assert
    expect(isThrown).toBe(true);
  });

  test('cancel appointment popup not initially shown even if there are appointments', async () => {
    // Arrange
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

    const workerUser = {
      userType: 'worker',
      personId: '8000000',
      accessToken: 'eeJAQr3wEC6CJZROFJTY',
    };

    const resp = { data: appointmentDetails };

    axios.get.mockImplementation(() => Promise.resolve(resp));

    // Act
    TestRenderer.create(<AppointmentList user={workerUser} />);

    // Waits for the axios to be called to ensure the full appointment list is rendered. 
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Assert
    expect(document.body.innerHTML).toEqual(expect.not.stringContaining('<div id="react-confirm-alert">'));
  });

  test('cancel button can be clicked when there are appointments', async () => {
    // Arrange
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

    const workerUser = {
      userType: 'worker',
      personId: '8000000',
      accessToken: 'eeJAQr3wEC6CJZROFJTY',
    };

    const resp = { data: appointmentDetails };

    axios.get.mockImplementation(() => Promise.resolve(resp));

    // Act
    const testRenderer = TestRenderer.create(<AppointmentList user={workerUser} />);
    const testInstance = testRenderer.root;

    // Waits for the axios to be called to ensure the full appointment list is rendered. 
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Assert
    expect(testInstance.findAllByProps({ className: "cancel-btn" })).toHaveLength(2);
  });

  test('clicking of cancel button brings up cancel appointment popup', async () => {
    // Arrange
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
      }
    ];

    const workerUser = {
      userType: 'worker',
      personId: '8000000',
      accessToken: 'eeJAQr3wEC6CJZROFJTY',
    };

    const resp = { data: appointmentDetails };

    axios.get.mockImplementation(() => Promise.resolve(resp));

    // Act
    const testRenderer = TestRenderer.create(<AppointmentList user={workerUser} />);
    const testInstance = testRenderer.root;

    // Waits for the axios to be called before attempting to click the cancel button.
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    testInstance.findByProps({ className: "cancel-btn" }).props.onClick({ target: { id: appointmentDetails[0].appointmentId } });

    // Assert
    expect(document.body.innerHTML).toContain('<div id="react-confirm-alert">');
  });

  test('user clicks yes button on the cancel appointment popup and api returns true', async () => {
    // Arrange
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
      }
    ];

    const workerUser = {
      userType: 'worker',
      personId: '8000000',
      accessToken: 'eeJAQr3wEC6CJZROFJTY',
    };
    const appointmentResponse = { data: appointmentDetails };
    const successCancellationResponse = { data: true };
    const successMsg = "The appointment has been cancelled!";

    // Adjusts the api response based on which endpoint was called.
    axios.get.mockImplementation((url) => {
      if (url.includes('/api/appointments')) return Promise.resolve(appointmentResponse);
      else return Promise.resolve(successCancellationResponse);
    });

    window.alert = jest.fn();

    // Act
    const testRenderer = TestRenderer.create(<AppointmentList user={workerUser} />);
    const testInstance = testRenderer.root;

    // Waits for the axios to be called before attempting to click the cancel button.
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    testInstance.findByProps({ className: "cancel-btn" }).props.onClick({ target: { id: appointmentDetails[0].appointmentId } });

    // Mock appending and removing child from the document body to prevent issues with virtual dom interaction before clicking the yes button.
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    document.body.getElementsByClassName("yes-cancel-btn")[0].click();

    // Waits for the axios to be called before attempting to check that the alert was called.
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Assert
    expect(window.alert).toHaveBeenCalledWith(successMsg);
  });

  test('user clicks yes button on the cancel appointment popup and api returns false', async () => {
    // Arrange
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
      }
    ];

    const workerUser = {
      userType: 'worker',
      personId: '8000000',
      accessToken: 'eeJAQr3wEC6CJZROFJTY',
    };
    const appointmentResponse = { data: appointmentDetails };
    const errorCancellationResponse = { data: false };
    const errorMsg = "The appointment was NOT cancelled. Please try again.";

    // Adjusts the api response based on which endpoint was called.
    axios.get.mockImplementation((url) => {
      if (url.includes('/api/appointments')) return Promise.resolve(appointmentResponse);
      else return Promise.resolve(errorCancellationResponse);
    });

    window.alert = jest.fn();

    // Act
    const testRenderer = TestRenderer.create(<AppointmentList user={workerUser} />);
    const testInstance = testRenderer.root;

    // Waits for the axios to be called before attempting to click the cancel button.
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    testInstance.findByProps({ className: "cancel-btn" }).props.onClick({ target: { id: appointmentDetails[0].appointmentId } });

    // Mock appending and removing child from the document body to prevent issues with virtual dom interaction before clicking the yes button.
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    document.body.getElementsByClassName("yes-cancel-btn")[0].click();

    // Waits for the axios to be called before attempting to check that the alert was called.
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Assert
    expect(window.alert).toHaveBeenCalledWith(errorMsg);
  });

  test('user clicks yes button on the cancel appointment popup and api has an error', async () => {
    // Arrange
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
      }
    ];

    const workerUser = {
      userType: 'worker',
      personId: '8000000',
      accessToken: 'eeJAQr3wEC6CJZROFJTY',
    };
    const appointmentResponse = { data: appointmentDetails };
    const errorCancellationResponse = { error: "Unknown error occurred." };
    const errorMsg = "The appointment was NOT cancelled. Please try again.";

    // Adjusts the api response based on which endpoint was called.
    axios.get.mockImplementation((url) => {
      if (url.includes('/api/appointments')) return Promise.resolve(appointmentResponse);
      else return Promise.resolve(errorCancellationResponse);
    });

    window.alert = jest.fn();

    // Act
    const testRenderer = TestRenderer.create(<AppointmentList user={workerUser} />);
    const testInstance = testRenderer.root;

    // Waits for the axios to be called before attempting to click the cancel button.
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    testInstance.findByProps({ className: "cancel-btn" }).props.onClick({ target: { id: appointmentDetails[0].appointmentId } });

    // Mock appending and removing child from the document body to prevent issues with virtual dom interaction before clicking the yes button.
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    document.body.getElementsByClassName("yes-cancel-btn")[0].click();

    // Waits for the axios to be called before attempting to check that the alert was called.
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Assert
    expect(window.alert).toHaveBeenCalledWith(errorMsg);
  });

  test('user clicks no button on the cancel appointment popup', async () => {
    // Arrange
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
      }
    ];

    const workerUser = {
      userType: 'worker',
      personId: '8000000',
      accessToken: 'eeJAQr3wEC6CJZROFJTY',
    };
    const resp = { data: appointmentDetails };

    axios.get.mockImplementation(() => Promise.resolve(resp));

    // Act
    const testRenderer = TestRenderer.create(<AppointmentList user={workerUser} />);
    const testInstance = testRenderer.root;

    // Waits for the axios to be called before attempting to click the cancel button.
    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    testInstance.findByProps({ className: "cancel-btn" }).props.onClick({ target: { id: appointmentDetails[0].appointmentId } });

    // Mock appending and removing child from the document body to prevent issues with virtual dom interaction before clicking the no button.
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    document.body.getElementsByClassName("no-cancel-btn")[0].click();

    // Assert
    expect(document.body.innerHTML).toEqual(expect.not.stringContaining('<h1>Appointment Cancellation Confirmation</h1>'));
  });

});
