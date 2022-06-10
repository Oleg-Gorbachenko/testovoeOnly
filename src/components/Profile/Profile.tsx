import React from 'react';
import {useAppDispatch, useAppSelector} from "../../state/store";
import {Navigate} from "react-router-dom";
import {PATH} from '../Pages/Pages';
import s from "./Profile.module.css";
import {exitTC} from "../../reducers/authReducer";

export const Profile = () => {

    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const email = useAppSelector<string>(state => state.auth.email)
    const dispatch = useAppDispatch()

    if (!isAuth) {
        return <Navigate to={PATH.AUTH}/>
    }
    const onBtnClickHandler = () => {
        dispatch(exitTC())
    }
    return (
        <div className={s.wrapper}>
            <h1 className={s.title}>ONLY.</h1>
            <p className={s.greeting}>Здравствуйте, <b style={{fontWeight: 'bold'}}>{`${email}`}</b></p>
            <button className={s.btn} onClick={onBtnClickHandler}>Выйти</button>
        </div>
    );
};