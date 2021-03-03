import React, { Component } from "react";
import { STANDBY, CALIBRATING, ARMED } from "../../utils";
import shrek from "../../assets/shrek.mp3";

class AudioVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.maxVolume = React.createRef();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw() {
        const { audioData } = this.props;
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext("2d");
        let x = 0;
        const sliceWidth = (width * 1.0) / audioData.length;
        const shoutout = new Audio(shrek);

        context.lineWidth = 2;
        context.strokeStyle = "#ffffff";
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(0, height / 2);
        for (const item of audioData) {
            const volumeMetric = item / 255.0;
            const y = volumeMetric * height;

            // Begin calibration
            const setMaxVolume = (item) => {
                this.props.SetStatus(CALIBRATING);
                const maxVolume = this.maxVolume.current;
                const currentVolume = volumeMetric;
                if (maxVolume < currentVolume) {
                    this.maxVolume.current = currentVolume;
                    // console.log(
                    //     "New max volume set at: ",
                    //     this.maxVolume.current
                    // );
                }
            };
            //console.log(this.props.isCalibrated);
            if (!this.props.isCalibrated) {
                //console.log("Max volume set: ", this.props.isCalibrated);
                setMaxVolume(item);
            } else this.props.SetStatus(ARMED);

            // Scare them off from the kitchen
            if (volumeMetric > this.maxVolume.current) {
                if (shoutout.paused) {
                    shoutout.play();
                }
            }

            context.lineTo(x, y);
            x += sliceWidth;
        }
        context.lineTo(x, height / 2);
        context.stroke();
    }

    render() {
        return (
            <>
                <canvas width="300" height="300" ref={this.canvas} />
            </>
        );
    }
}

export default AudioVisualiser;
