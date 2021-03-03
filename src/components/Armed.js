import React, { useState, useEffect, useRef } from "react";
import { tConvert, timeInMinutes, STANDBY, CALIBRATING, ARMED } from "../utils";
import Audio from "./Audio";

function Armed({ startTime, endTime }) {
    const [status, SetStatus] = useState(STANDBY);
    const [currentTime, SetCurrentTime] = useState(
        new Date().toLocaleTimeString()
    );
    const isActivated = useRef(false);

    useEffect(() => {
        let secTimer = setInterval(() => {
            SetCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        const currentTimeMinutes = timeInMinutes(currentTime);
        const startTimeMinutes = timeInMinutes(startTime);
        const endTimeMinutes = timeInMinutes(endTime);
        // console.log("Current time: ", currentTimeMinutes);
        // console.log("Start time: ", startTimeMinutes);
        // console.log("End time: ", endTimeMinutes);

        // if we have a eating window that does not overlap night to day
        if (startTime < endTime) {
            if (
                currentTimeMinutes >= startTimeMinutes &&
                currentTimeMinutes < endTimeMinutes
            ) {
                isActivated.current = false;
            } else {
                isActivated.current = true;
            }
        } // In case we have the start of an eating window the day before (before 00:00)
        else {
            if (
                currentTimeMinutes <= startTimeMinutes &&
                currentTimeMinutes < endTimeMinutes
            ) {
                isActivated.current = false;
            } else {
                isActivated.current = true;
            }
        }

        return () => clearInterval(secTimer);
    }, [currentTime]);

    return (
        <div className="screen-container">
            <h1>{status}</h1>
            <p>The start time is {tConvert(startTime)}</p>
            <p>The end time is {tConvert(endTime)}</p>
            <p>Current time {currentTime}</p>
            <p>Are we armed? {isActivated.current ? "Yes" : "No"}</p>
            {isActivated.current && (
                <Audio status={status} SetStatus={SetStatus} />
            )}
        </div>
    );
}

export default Armed;
