import React from 'react';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from "../../state/store";
import {Button} from "../../common/Components/c2-Button/Button";
import {Checkbox} from "../../common/Components/c3-Checkbox/Checkbox";
import {InputText} from "../../common/Components/c1-InputText/InputText";
import {initializeAppTC} from "../../reducers/authReducer";
import s from "./Login.module.css";
import errorImg from '../../common/img/error.png'

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LoginForm = () => {
    const isDisabled = useAppSelector<boolean>(state => state.auth.isDisabled)
    const showError = useAppSelector<boolean>(state => state.auth.showError)
    const userEmail = useAppSelector<string>(state => state.auth.email)
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = 'Обязательное поле';
            }
            if (!values.password) {
                errors.password = 'Обязательное поле'
            }
            return errors;
        },

        onSubmit: values => {
            dispatch<any>(initializeAppTC(values.email, values.password, values.rememberMe));
            formik.resetForm({})
        },
    });

    let emailError = ''
    let passwordError = ''
    if (formik.errors.email && formik.touched.email) {
        emailError = formik.errors.email
    }
    if (formik.errors.password && formik.touched.password) {
        passwordError = formik.errors.password
    }

    return (
        <>
            {showError && <div className={s.errorMessage}>
                <img className={s.errorImg} src={errorImg} alt={'error'}/>
                <span className={s.errorText}>{`Пользователя ${userEmail} не существует`}</span>
            </div>}
            <form onSubmit={formik.handleSubmit}>
                <div className={s.text}>Логин</div>
                <InputText
                    error={emailError}
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                <div className={s.text}>Пароль</div>
                <InputText
                    error={passwordError}
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                <label className={s.label}>
                    <Checkbox
                        {...formik.getFieldProps('rememberMe')}
                    />Запомнить пароль
                </label>
                <Button isDisabled={isDisabled} type={'submit'}>
                    Войти
                </Button>
            </form>
        </>
    )
}

