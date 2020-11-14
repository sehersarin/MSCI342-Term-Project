import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent } from '@testing-library/react';
import * as axios from 'axios';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';

import EmergencyDayCancellation from './EmergencyDayCancellation';

jest.mock('axios');

describe('EmergencyDayCancellation component', () => {
    afterEach(cleanup);

    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('Snapshot successfully renders', () => {
        // Arrange
        // No variables needed for this test case.

        // Act
        const component = create(<EmergencyDayCancellation />);

        // Assert
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('modal not initially shown', () => {
        // Arrange
        const isInitialModalShown = false;

        // Act
        const testRenderer = TestRenderer.create(<EmergencyDayCancellation />);
        const testInstance = testRenderer.root;

        // Arrange
        expect(testInstance.findByType(Modal).props.isOpen).toBe(isInitialModalShown);
    });

    test('modal shown after appropriate button click', () => {
        // Arrange
        const isModalShownAfterClick = true;

        // Act
        const testRenderer = TestRenderer.create(<EmergencyDayCancellation />);
        const testInstance = testRenderer.root;
        ReactDOM.createPortal = node => node; // Needed to mock the portal parent for clicking.
        testInstance.findByProps({ className: "cancelAppointmentBtn" }).props.onClick();

        // Arrange
        expect(testInstance.findByType(Modal).props.isOpen).toBe(isModalShownAfterClick);
    });

    test('successful submission of the cancellation modal with a date inputted with correct user props', async () => {
        // Arrange
        const testUser = {
            userType: 'worker',
            personId: '8000000',
            accessToken: 'XcCa92ZvOnQKZsGtOKOa',
        };
        const selectedDate = '2020-12-15';
        const resp = { data: true };
        const successfulSubmissionMsg = "Success!\nAll appointments for Tuesday, Dec 15, 2020 have been cancelled!";
        axios.get.mockImplementation(() => Promise.resolve(resp));
        window.alert = jest.fn();

        // Act
        const testRenderer = TestRenderer.create(<EmergencyDayCancellation user={testUser} />);
        const testInstance = testRenderer.root;
        ReactDOM.createPortal = node => node; // Needed to mock the portal parent for clicking.
        testInstance.findByProps({ className: "cancelAppointmentBtn" }).props.onClick(); // Opens the modal.
        testInstance.findByProps({ className: "cancelledDateInput" }).props.onChange({ target: { value: selectedDate } }); // Simulates user input of date.
        await testInstance.findByProps({ className: "cancelDayForm" }).props.onSubmit({ preventDefault: () => { } }); // Submits the form.

        // Arrange
        expect(window.alert).toHaveBeenCalledWith(successfulSubmissionMsg);
    });

    test('failed submission of the cancellation modal with a date inputted with correct user props', async () => {
        // Arrange
        const testUser = {
            userType: 'worker',
            personId: '8000000',
            accessToken: 'XcCa92ZvOnQKZsGtOKOa',
        };
        const selectedDate = '2020-12-15';
        const resp = { data: false };
        const failedMsg = "Error!\nAn issue occurred when trying to cancel all appointments for Tuesday, Dec 15, 2020.\nPlease try again!";
        axios.get.mockImplementation(() => Promise.resolve(resp));
        window.alert = jest.fn();

        // Act
        const testRenderer = TestRenderer.create(<EmergencyDayCancellation user={testUser} />);
        const testInstance = testRenderer.root;
        ReactDOM.createPortal = node => node; // Needed to mock the portal parent for clicking.
        testInstance.findByProps({ className: "cancelAppointmentBtn" }).props.onClick(); // Opens the modal.
        testInstance.findByProps({ className: "cancelledDateInput" }).props.onChange({ target: { value: selectedDate } }); // Simulates user input of date.
        await testInstance.findByProps({ className: "cancelDayForm" }).props.onSubmit({ preventDefault: () => { } }); // Submits the form.

        // Arrange
        expect(window.alert).toHaveBeenCalledWith(failedMsg);
    });

    test('submission of the cancellation modal with no user props but a date is inputted', async () => {
        // Arrange
        const selectedDate = '2020-12-15';
        var isThrown = false;
        const resp = { data: false };
        axios.get.mockImplementation(() => Promise.resolve(resp));

        // Act
        try {
            const testRenderer = TestRenderer.create(<EmergencyDayCancellation />);
            const testInstance = testRenderer.root;
            ReactDOM.createPortal = node => node; // Needed to mock the portal parent for clicking.
            testInstance.findByProps({ className: "cancelAppointmentBtn" }).props.onClick(); // Opens the modal.
            testInstance.findByProps({ className: "cancelledDateInput" }).props.onChange({ target: { value: selectedDate } }); // Simulates user input of date.
            await testInstance.findByProps({ className: "cancelDayForm" }).props.onSubmit({ preventDefault: () => { } }); // Submits the form.
        } catch (err) {
            isThrown = true;
        }

        // Arrange
        expect(isThrown).toBe(true);
    });

    test('submission of the cancellation modal with invalid date inputted and correct user props', async () => {
        const testUser = {
            userType: 'worker',
            personId: '8000000',
            accessToken: 'XcCa92ZvOnQKZsGtOKOa',
        };
        const failedMsg = "Error!\nAn issue occurred when trying to cancel all appointments for Invalid date.\nPlease try again!";
        window.alert = jest.fn();

        // Act
        const testRenderer = TestRenderer.create(<EmergencyDayCancellation user={testUser} />);
        const testInstance = testRenderer.root;
        ReactDOM.createPortal = node => node; // Needed to mock the portal parent for clicking.
        testInstance.findByProps({ className: "cancelAppointmentBtn" }).props.onClick(); // Opens the modal.
        testInstance.findByProps({ className: "cancelledDateInput" }).props.onChange({ target: { value: "YYYY-MM-DD" } }); // Empty value for the date.
        await testInstance.findByProps({ className: "cancelDayForm" }).props.onSubmit({ preventDefault: () => { } }); // Submits the form.

        // Arrange
        expect(window.alert).toHaveBeenCalledWith(failedMsg);
    });

    test('submission of the cancellation modal with no date inputted and correct user props', async () => {
        const testUser = {
            userType: 'worker',
            personId: '8000000',
            accessToken: 'XcCa92ZvOnQKZsGtOKOa',
        };
        const failedMsg = "Error!\nAn issue occurred when trying to cancel all appointments for Invalid date.\nPlease try again!";
        window.alert = jest.fn();

        // Act
        const testRenderer = TestRenderer.create(<EmergencyDayCancellation user={testUser} />);
        const testInstance = testRenderer.root;
        ReactDOM.createPortal = node => node; // Needed to mock the portal parent for clicking.
        testInstance.findByProps({ className: "cancelAppointmentBtn" }).props.onClick(); // Opens the modal.
        await testInstance.findByProps({ className: "cancelDayForm" }).props.onSubmit({ preventDefault: () => { } }); // Submits the form.

        // Arrange
        expect(window.alert).toHaveBeenCalledWith(failedMsg);
    });

});
