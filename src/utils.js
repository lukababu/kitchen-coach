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

export function timeFormat2IntMinutes(inputTime) {
    let time = inputTime;
    console.log("input: ", inputTime);

    time = time.split(":");

    let timeParse = new Date(0, 0, 0, time[0], time[1], 0);
    const minutes = timeParse.getTime();
    console.log("minutes: ", minutes);

    return minutes;
}
