import React from 'react';
import {LoginForm} from "../Login/Login";
import s from "./Auth.module.css"
import {Navigate} from "react-router-dom";
import {PATH} from "../Pages/Pages";
import {useAppSelector} from "../../state/store";


export const Auth = () => {

    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)

    if (isAuth) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={s.wrapper}>
            <h1 className={s.title}>ONLY.</h1>
            <div className={s.loginForm}>
                <LoginForm/>
            </div>
        </div>
    );
};