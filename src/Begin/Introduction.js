import React from "react";
import { Link } from "react-router-dom";
import SetTime from "./SetTime";

function Introduction() {
    return (
        <>
            <div className="mobile-app">
                <h1>Welcome to Kitchen Coach</h1>
                <p>This app is meant to help discipline you in the kitchen</p>
                <p>
                    Research has shown intermitent fasting to help with weight
                    loss. <Link to="#">Learn more</Link>
                </p>
                <SetTime />
            </div>
        </>
    );
}

export default Introduction;
