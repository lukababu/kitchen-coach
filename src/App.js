import React from "react";
import "./App.scss";
import { useMediaQuery } from "react-responsive";
import Introduction from "./Begin/Introduction";

function App() {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-device-width: 1224px)",
    });
    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)",
    });

    return (
        <div className="App">
            {isDesktopOrLaptop && (
                <div className="desktop">
                    <h1>
                        You're useing a desktop
                        <br />
                        Please switch to a mobile device
                    </h1>
                </div>
            )}

            {isTabletOrMobileDevice && <Introduction />}
        </div>
    );
}

export default App;
