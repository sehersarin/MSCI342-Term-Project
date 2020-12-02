import React from "react";
import { create } from "react-test-renderer";
import { render, waitFor, cleanup, fireEvent, getByTestId, getByDisplayValue } from '@testing-library/react';
import * as axios from 'axios';
import SelectWorkerForm from "./SelectWorkerForm";
import ReactDOM from 'react-dom';
import moment from 'moment'
import { BrowserRouter } from "react-router-dom";

jest.mock('axios');

describe('Check select worker component', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.resetModules(); // Clears any cache between tests.
  });

  test('no props are passed in', () => {
    // Arrange
    var isThrown = false;

    // Act
    try {
      const component = create(<BrowserRouter>
        < SelectWorkerForm/>
      </BrowserRouter>);
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
      const component = create(<BrowserRouter>
        < SelectWorkerForm user={nullUser}/>
      </BrowserRouter>);
    } catch (err) {
      isThrown = true;
    }

    // Assert
    expect(isThrown).toBe(true);
  });

  test('valid props and nonempty array of appointments from api', async () => {
    // Arrange
    const studentUser = {
      email: "johndoe@gmail.com",
      schoolId: "1",
      userType: 'student',
      personId: '12345678',
      accessToken: 'XcCa92ZvOnQKZsGtOKOa',
    };

    const workerDetails = [
      {
        workerId: 8000000,
        firstName: "Joshua",
        lastName: "Brooks",
        email: "joshuabrooks@gmail.com",
        userType: "worker",
        accessToken: "eeJAQr3wEC6CJZROFJTY",
        phone: "+15191234567",
        specialization: "Masters in Social Work",
        type: "Guidance Counselor"
    },
    {
        workerId: 8000001,
        firstName: "Carlos",
        lastName: "Smiths",
        email: "carlossmiths@gmail.com",
        userType: "worker",
        accessToken: "zV1Qnsx5VZKepGEFPAA3",
        phone: null,
        specialization: "Masters in Social Work",
        type: "Guidance Counselor"
    },
    {
        workerId: 8000002,
        firstName: "Tyler",
        lastName: "Evans",
        email: "tylerevans@gmail.com",
        userType: "worker",
        accessToken: "f1vkT2o7monUUzvPREHP",
        phone: null,
        specialization: "Masters in Social Work",
        type: "Social Worker"
    },
    {
        workerId: 8000003,
        firstName: "Kate",
        lastName: "Loven",
        email: "kateloven@gmail.com",
        userType: "worker",
        accessToken: "2OkQNaWyEZTU1JaEuBjh",
        phone: null,
        specialization: "Masters in Social Work",
        type: "Social Worker"
    }
    ];
    const resp = { data: workerDetails };

    axios.post.mockImplementation(() => Promise.resolve(resp));

    // Act
    const { container } = render(<BrowserRouter>
      < SelectWorkerForm user={studentUser}/>
    </BrowserRouter>);
    await waitFor(() => expect(axios.post).toHaveBeenCalled())

    // Assert
    expect(container.innerHTML.includes("Joshua Brooks")).toBe(true);
  });

  test("Testing case where user does not select a worker", async () => {
    //Arrange
    const studentUser = {
      email: "johndoe@gmail.com",
      schoolId: "1",
      userType: 'student',
      personId: '12345678',
      accessToken: 'XcCa92ZvOnQKZsGtOKOa',
    };

    const workerDetails = [
      {
        workerId: 8000000,
        firstName: "Joshua",
        lastName: "Brooks",
        email: "joshuabrooks@gmail.com",
        userType: "worker",
        accessToken: "eeJAQr3wEC6CJZROFJTY",
        phone: "+15191234567",
        specialization: "Masters in Social Work",
        type: "Guidance Counselor"
    },
    {
        workerId: 8000001,
        firstName: "Carlos",
        lastName: "Smiths",
        email: "carlossmiths@gmail.com",
        userType: "worker",
        accessToken: "zV1Qnsx5VZKepGEFPAA3",
        phone: null,
        specialization: "Masters in Social Work",
        type: "Guidance Counselor"
    },
    {
        workerId: 8000002,
        firstName: "Tyler",
        lastName: "Evans",
        email: "tylerevans@gmail.com",
        userType: "worker",
        accessToken: "f1vkT2o7monUUzvPREHP",
        phone: null,
        specialization: "Masters in Social Work",
        type: "Social Worker"
    },
    {
        workerId: 8000003,
        firstName: "Kate",
        lastName: "Loven",
        email: "kateloven@gmail.com",
        userType: "worker",
        accessToken: "2OkQNaWyEZTU1JaEuBjh",
        phone: null,
        specialization: "Masters in Social Work",
        type: "Social Worker"
    }
    ];
    const dom = render(<BrowserRouter>
      < SelectWorkerForm user={studentUser}/>
    </BrowserRouter>);
      
    const submit = getByDisplayValue(dom.container, "Next")

    //Act
    window.alert = jest.fn();
    const resp = { data: workerDetails}
    const expectedArg = "Please Select a Worker";
    await axios.post.mockImplementation(() => Promise.resolve(resp));
    fireEvent.click(radio)
    fireEvent.click(submit)


    //Assert
    expect(window.alert).toHaveBeenCalledWith(expectedArg);
  })


  });



