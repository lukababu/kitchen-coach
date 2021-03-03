export const STANDBY = "Standby";
export const CALIBRATING = "Calibrating";
export const ARMED = "Armed";

export function timeDiffrence(startTime, endTime) {
    if (startTime === null || endTime === null) return -1;

    let start = startTime.toString();
    let end = endTime.toString();

    start = start.split(":");
    end = end.split(":");
    let startDate = new Date(0, 0, 0, start[0], start[1], 0);
    let endDate = new Date(0, 0, 0, end[0], end[1], 0);
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    let minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0) hours = hours + 24;

    return (
        (hours <= 9 ? "0" : "") +
        hours +
        ":" +
        (minutes <= 9 ? "0" : "") +
        minutes
    );
}

export function timeInMinutes(inputTime) {
    let time = inputTime;
    //console.log("input: ", inputTime);

    time = time.split(":");

    let timeParse = new Date(0, 0, 0, time[0], time[1], 0);
    const hours = timeParse.getHours();
    const minutes = timeParse.getMinutes() + hours * 60;

    return minutes;
}

export function timeReadable(inputTime) {
    let time = inputTime;

    time = time.split(":");

    let timeParse = new Date(0, 0, 0, time[0], time[1], 0);
    const hours = timeParse.getHours();
    const minutes = timeParse.getMinutes();

    return hours + " hour(s) " + " and " + minutes + " minute(s)";
}

export function tConvert(time) {
    // Check correct time format and split into components
    time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
}
