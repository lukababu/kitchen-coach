import React from "react";
import { Link } from "react-router-dom";
import SetTime from "./SetTime";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Splash() {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-device-width: 1224px)",
    });
    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)",
    });

    return (
        <>
            {isDesktopOrLaptop && (
                <div className="desktop">
                    <h1>
                        You're useing a desktop.
                        <br />
                        Please switch to a mobile device
                    </h1>
                </div>
            )}

            {isTabletOrMobileDevice && (
                <div className="mobile-app">
                    <h1>Welcome to Kitchen Coach</h1>
                    <p>
                        This app is meant to help discipline you in the kitchen
                    </p>
                    <p>
                        <Link to="https://bodyisatemple.com/">
                            Why intermitent fasting?
                        </Link>
                    </p>
                    <NavLink to="/SetTime" className="link-from-splash">
                        Set up your schedule{" "}
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                    </NavLink>
                </div>
            )}
        </>
    );
}

export default Splash;
