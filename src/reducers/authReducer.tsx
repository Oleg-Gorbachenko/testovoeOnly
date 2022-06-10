import {AppThunkType} from "../state/store";

//variables
const SET_AUTH = "auth/SET-AUTH";
const SET_ERROR = "auth/SET-ERROR";
const SET_DISABLED_BTN = "auth/SET-DISABLED-BTN";

// func to simulate a request
function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Types
type InitStateType = typeof initState;

// Initial state
const initState = {
    isAuth: false,
    email: '',
    showError: false,
    isDisabled: false,
};

type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
type SetIsAuthActionType = ReturnType<typeof setIsAuthAC>;
type disabledBtnActionType = ReturnType<typeof disabledBtnAC>;
export type AuthActionsType = SetIsAuthActionType | SetAppErrorActionType | disabledBtnActionType;

// Action creators
export const setAppErrorAC = (email: string, showError: boolean) => ({type: SET_ERROR, email, showError} as const);
export const setIsAuthAC = (isAuth: boolean) => ({type: SET_AUTH, isAuth} as const);
export const disabledBtnAC = (isDisabled: boolean) => ({type: SET_DISABLED_BTN, isDisabled} as const);

// Thunk creators
export const initializeAppTC = (email: string, password: string, rememberMe: boolean): AppThunkType => (dispatch) => {
    dispatch(disabledBtnAC(true))
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'steve.jobs@example.com' && password === 'password') {
                resolve('success')
                dispatch(setAppErrorAC(email, false))
                dispatch(setIsAuthAC(true))
            } else {
                reject('error')
                dispatch(setAppErrorAC(email, true))
            }
        }, randomIntFromInterval(1000, 3000));
        dispatch(disabledBtnAC(false))
    })
};

export const exitTC = (): AppThunkType => (dispatch) => {
    dispatch(disabledBtnAC(true))
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('success')
            dispatch(setIsAuthAC(false))
        }, randomIntFromInterval(1000, 3000));
        dispatch(disabledBtnAC(false))
    })
};

// reducer
export const authReducer = (state: InitStateType = initState, action: AuthActionsType): InitStateType => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, email: action.email, showError: action.showError};
        case SET_AUTH:
            return {...state, isAuth: action.isAuth};
        case SET_DISABLED_BTN:
            return {...state, isDisabled: action.isDisabled};
        default:
            return state;
    }
};
