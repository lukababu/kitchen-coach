import React, { useState, useEffect, useRef } from "react";
import TimePicker from "react-time-picker";
import Confirmation from "./SetTime/Confirmation";

function SetTime({ startTime, endTime, SetStartTime, SetEndTime }) {
    const [windowValueSet, SetWindowValueSet] = useState(false);

    useEffect(() => {
        if (endTime !== null && startTime !== null) {
            SetWindowValueSet(true);
        }
    }, [endTime, startTime]);

    return (
        <div className="screen-container">
            <h1>Set up your fasting window</h1>
            <section className="start-time">
                <h2>Start Time</h2>
                <TimePicker
                    className="time-picker"
                    onChange={SetStartTime}
                    value={startTime}
                    name="Start time"
                    disableClock
                    clockIcon={null}
                    closeClock={true}
                    isOpen={false}
                    required
                />
            </section>
            {startTime && (
                <section className="end-time">
                    <h2>End Time</h2>
                    <TimePicker
                        className="time-picker"
                        onChange={SetEndTime}
                        value={endTime}
                        name="Start time"
                        disableClock
                        clockIcon={null}
                        closeClock={true}
                        isOpen={false}
                        required
                    />
                </section>
            )}
            {windowValueSet && (
                <Confirmation startTime={startTime} endTime={endTime} />
            )}
        </div>
    );
}

export default SetTime;
