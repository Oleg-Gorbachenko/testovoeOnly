import {Navigate,Route, Routes} from "react-router-dom";
import {Profile} from "../Profile/Profile";
import {Auth} from "../Auth/Auth";

export const PATH = {
    PROFILE: "/profile",
    AUTH: "/auth",
};

export const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Navigate to={PATH.PROFILE}/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.AUTH} element={<Auth/>}/>
            </Routes>
        </div>
    );
};
