import React, { Component } from "react";
import queryString from 'query-string';
import _ from 'lodash';
import Modal from 'react-modal';

import "./EmergencyDayCancellation.scss";

const axios = require('axios').default;
var moment = require('moment');

export default class EmergencyDayCancellation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            isSuccessfullyCancelled: false,
            cancelledDate: '',
        }

        // Binds methods to prevent issues with 'this' keyword.
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCancelledDateInput = this.handleCancelledDateInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelAppointments = this.cancelAppointments.bind(this);
    }

    showModal() {
        this.setState({ showModal: true })
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    // Stores the latest value of the cancelled date to the state variable.
    handleCancelledDateInput(event) {
        const val = event.target.value;
        this.setState({
            cancelledDate: val
        });
    };

    // Handles form submission logic and cancels the worker's appointments for the specified date.
    async handleSubmit(e) {
        e.preventDefault();

        await this.cancelAppointments();
        this.closeModal();
    }

    // Calls the back end endpoint to cancel all the worker's appointments for the specific date.
    async cancelAppointments() {
        const cancelledDate = this.state.cancelledDate;
        const params = { accessToken: this.props.user.accessToken, workerId: this.props.user.personId, specificDate: cancelledDate };
        // Formats the date for better readability.
        const formattedCancelledDate = moment(cancelledDate).format('dddd, MMM D, YYYY');

        await axios.get(`/api/cancel-specific-day/?${queryString.stringify(params)}`)
            .then(res => {
                if (_.isNil(res.error) && res.data) { // If no error and the returned response is true.
                    // Display the appropriate alert box based on whether the appointments were successfully cancelled.
                    alert(`Success!\nAll appointments for ${formattedCancelledDate} have been cancelled!`);
                } else alert(`Error!\nAn issue occurred when trying to cancel all appointments for ${formattedCancelledDate}.\nPlease try again!`);
            });
    }

    render() {
        return (
            <div>
                <button className="cancelAppointmentBtn" onClick={this.showModal}>Cancel All Appointments for a Specific Day</button>
                {/* Only displays the modal if the user has clicked the button to show the form. */}
                <Modal isOpen={this.state.showModal}>
                    <button onClick={this.closeModal} className="closeBtn">X</button>
                    <h1 align="center">Cancel Appointments for Specific Day</h1>
                    <form onSubmit={this.handleSubmit} className="cancelDayForm">
                        <label>Select the Specific Day: </label>
                        <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            required
                            className="cancelledDateInput"
                            onChange={this.handleCancelledDateInput} /> <br />
                        <input
                            className="submitBtn"
                            type="submit"
                            value="Cancel Day's Appointments" />
                    </form>
                </Modal>
            </div>
        );

    }
}
