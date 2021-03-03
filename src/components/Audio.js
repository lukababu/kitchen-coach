import React, { Component } from "react";
import AudioAnalyser from "./Audio/AudioAnalyser";
import { STANDBY, CALIBRATING, ARMED } from "../utils";

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audio: null,
            time: 0,
            isOn: false,
            start: 0,
            isCalibrated: false,
        };
        this.toggleMicrophone = this.toggleMicrophone.bind(this);
        this.isCalibrated = React.createRef();
    }

    componentDidUpdate() {
        this.timerCheck();
    }

    timerCheck() {
        if (!this.state.isCalibrated && this.state.time >= 60000) {
            this.setState({ isCalibrated: true });
            //console.log("timer over");
        }
    }

    async getMicrophone() {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        });
        this.setState({ audio });

        //Start calibration timer
        this.setState({
            time: this.state.time,
            start: Date.now() - this.state.time,
            isOn: true,
        });
        this.timer = setInterval(
            () =>
                this.setState({
                    time: Date.now() - this.state.start,
                }),
            1
        );
    }

    stopMicrophone() {
        this.state.audio.getTracks().forEach((track) => track.stop());
        this.setState({ audio: null });
        this.props.SetStatus(STANDBY);

        // Stop timer
        this.setState({ isOn: false });
        clearInterval(this.timer);
    }

    toggleMicrophone() {
        if (this.state.audio) {
            this.stopMicrophone();
        } else {
            this.getMicrophone();
        }
    }

    render() {
        return (
            <div className="App">
                <div className="controls">
                    <button onClick={this.toggleMicrophone}>
                        {this.state.audio ? "Disarm" : "Arm"}
                    </button>
                </div>

                {this.state.audio ? (
                    <AudioAnalyser
                        audio={this.state.audio}
                        SetStatus={this.props.SetStatus}
                        isCalibrated={this.state.isCalibrated}
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default Audio;
