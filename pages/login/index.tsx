import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import AuthLayout from '@/components/AuthLayout';
import { NextPage } from 'next';
import UseLogin from './_components/UseLogin';
import { handleLogin } from './_components/LoginHandler';
import { useLazyLoginUserQuery } from '@/store/Register/LoginApi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Login } from '@/type/type';
import Head from 'next/head';
import Loading from '@/components/Loading/Loading';
import { useTranslation } from 'react-i18next';
const Index: NextPage = () => {
    const [values, setValues] = useState<Login>({
        Email: '',
        Pword: '',
        rememberMe: false,
        showPassword: false,
        errors: {},
    });
    const { t } = useTranslation();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginUser] = useLazyLoginUserQuery();
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setValues({ ...values, Email: storedEmail });
            localStorage.removeItem('email');
        }
    }, [values]);

    const handleChange = (prop: keyof Login) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const onSubmit = async () => {
        try {
            await handleLogin(
                values,
                setValues,
                setSubmitError,
                setIsAuthenticated,
                loginUser,
                dispatch,
                router,
                setIsLoading
            );
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <AuthLayout>
            <>
                <ToastContainer />
                <Head>
                    <title>{t('Sign In Page')}</title>
                    <meta name="description" content="Sign In Page" />
                </Head>

                {isLoading && <Loading />}
                <UseLogin
                    values={values}
                    handleChange={handleChange}
                    handleClickShowPassword={handleClickShowPassword}
                    handleSubmit={onSubmit}
                    setRememberMe={checked => setValues({ ...values, rememberMe: checked })}
                    setIsLoading={setIsLoading}
                />
            </>
        </AuthLayout>
    );
};

export default Index;
