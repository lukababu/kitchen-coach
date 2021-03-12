import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

import Splash from "./components/Splash";
import SetTime from "./components/SetTime";
import Armed from "./components/Armed";
import Error from "./components/Error";

function App() {
    const [startTime, SetStartTime] = useState(null);
    const [endTime, SetEndTime] = useState(null);

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" component={Splash} exact />
                    <Route
                        path="/SetTime"
                        render={(props) => (
                            <SetTime
                                {...props}
                                startTime={startTime}
                                endTime={endTime}
                                SetStartTime={SetStartTime}
                                SetEndTime={SetEndTime}
                            />
                        )}
                    />
                    <Route
                        path="/Armed"
                        render={(props) => (
                            <Armed
                                {...props}
                                startTime={startTime}
                                endTime={endTime}
                            />
                        )}
                    />
                    <Route component={Error} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
