import React from "react";

import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <NavLink to="/">Splash</NavLink>
            <NavLink to="/SetTime">Set Time</NavLink>
            <NavLink to="/Armed">Armed</NavLink>
        </div>
    );
};

export default Navigation;
