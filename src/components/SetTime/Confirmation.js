import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import { timeDiffrence, timeReadable, timeInMinutes } from "../../utils";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Confirmation({ startTime, endTime }) {
    const [eatingWindow, SetEatingWindow] = useState(
        timeDiffrence(startTime, endTime)
    );
    const isValid = useRef(true);
    const [errorMessage, SetErrorMessage] = useState(null);

    const history = useHistory();
    const handleOnClick = useCallback(() => history.push("/Armed"), [history]);

    useEffect(() => {
        function categorizeTime() {
            SetEatingWindow(timeDiffrence(startTime, endTime));
            const eatingWindowMinutes = timeInMinutes(eatingWindow);

            if (eatingWindowMinutes < 60) {
                isValid.current = false;
                SetErrorMessage(
                    "Whoa there partner, take your time and enjoy one meal for at least an hour."
                );
            } else if (eatingWindowMinutes > 720) {
                isValid.current = false;
                SetErrorMessage("Start with at most a 12 hour eating window.");
            }
        }
        categorizeTime();
        return () => {
            isValid.current = true;
            SetErrorMessage(null);
        };
    }, [startTime, endTime, eatingWindow]);

    return (
        <section className="time-diffrence">
            <p className="time">
                You have an eating time window of {timeReadable(eatingWindow)}
            </p>
            {!isValid.current && <p className="error">{errorMessage}</p>}
            <Button
                variant="light"
                type="submit"
                size="lg"
                onClick={isValid.current ? handleOnClick : null}
                disabled={!isValid.current}
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
