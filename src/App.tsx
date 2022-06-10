import React from 'react';
import s from "./App.module.css"
import {Pages} from "./components/Pages/Pages";

export function App() {
    return (
        <div className={s.App}>
            <Pages/>
        </div>
    );
}