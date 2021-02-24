import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import SetTime from "./SetTime";
import { timeDiffrence, timeFormat2IntMinutes } from "../utils";
import PropTypes from "prop-types";

function Confirmation({ startTime, endTime }) {
    const [eatingWindow, SetEatingWindow] = useState(
        timeDiffrence(startTime, endTime)
    );

    function categorizeTime() {
        console.log("Int time is: ", timeFormat2IntMinutes(eatingWindow));
    }

    return (
        <section className="time-diffrence">
            <p className="time">
                You have an eating time window of {eatingWindow}
            </p>
            <Button
                variant="light"
                type="submit"
                size="lg"
                onClick={categorizeTime()}
            >
                Confirm
            </Button>
        </section>
    );
}

Confirmation.propTypes = {
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
};
export default Confirmation;
