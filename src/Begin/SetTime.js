import React, { useState, useEffect, useRef } from "react";
import TimePicker from "react-time-picker";
import Confirmation from "./Confirmation";

function SetTime() {
    const [startTime, SetStartTime] = useState(null);
    const [endTime, SetEndTime] = useState(null);
    const [windowValueSet, SetWindowValueSet] = useState(false);

    useEffect(() => {
        if (endTime !== null && startTime !== null) {
            console.log("Start: ", startTime);
            console.log("End: ", endTime);
            SetWindowValueSet(true);
        }
    }, [endTime, startTime]);

    return (
        <div className="time-picker-container">
            <div className="time-grid">
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
            </div>
            {windowValueSet && (
                <Confirmation startTime={startTime} endTime={endTime} />
            )}
        </div>
    );
}

export default SetTime;
