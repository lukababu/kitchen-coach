import React, { Component } from "react";
import AudioAnalyser from "./Audio/AudioAnalyser";
import { STANDBY, CALIBRATING, ARMED } from "../utils";

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audio: null,
            isCalibrated: false,
        };
        this.toggleMicrophone = this.toggleMicrophone.bind(this);
        this.isCalibrated = React.createRef();
    }

    calibrate() {
        if (!this.state.isCalibrated) {
            setInterval(() => {
                this.setState({ isCalibrated: true });
            }, 60000);
        }
    }

    async getMicrophone() {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        });
        this.setState({ audio });

        // Start calibration
        this.calibrate();
    }

    stopMicrophone() {
        this.state.audio.getTracks().forEach((track) => track.stop());
        this.setState({ audio: null });
        this.props.SetStatus(STANDBY);

        // Reset calibration
        this.setState({ isCalibrated: false });
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
