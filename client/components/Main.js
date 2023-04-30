import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import Four0FourPage from "./Four0FourPage";
import UserProfile from "./UserProfile";
import NavBar from "./NavBar";
const Main = () => {

    return (
        <>
            <div className="Main">
                <NavBar />
                <Routes>
                <Route path = '*' element={<Four0FourPage />}/>
                    <Route path = '/*' element={<UserProfile />}/>
                    <Route path = '/' element={<UserProfile />}/>
                </Routes>
            </div>
        </>
    );
};

export default Main;
