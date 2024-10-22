import React, { useState } from 'react';
import { NextPage } from 'next';
import AuthLayout from '@/components/AuthLayout';
import { ToastContainer } from 'react-toastify';
import RegistrationForm from './_components/RegistrationForm';
import { Register } from '@/type/type';
import { RegisterHandle } from './_components/RegisterHandle';
import Loading from '@/components/Loading/Loading';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Index: NextPage = () => {
    const { t } = useTranslation();
    const [values, setValues] = React.useState<Register>({
        p_Mail: '',
        CNAME: '',
        TEL: '',
        NAT: '',
        C_ADDRESS: '',
        C_PASS: '',
        RememberMe: false,
        showPassword: false,
        emailError: '',
        errors: {},
    });
    const [isLoading, setIsLoading] = useState(false);

    const { handleAdd } = RegisterHandle(values, setValues, setIsLoading);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await handleAdd();
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    return (
        <AuthLayout>
            <>
                <ToastContainer />
                <Head>
                    <title>{t('Sign Up Page')}</title>
                    <meta name="description" content="Sign Up Page" />
                </Head>
                {isLoading && <Loading />}
                <RegistrationForm
                    values={values}
                    handleChange={prop => e => setValues({ ...values, [prop]: e.target.value })}
                    handleClickShowPassword={() =>
                        setValues({ ...values, showPassword: !values.showPassword })
                    }
                    handleAdd={handleSubmit}
                    setValues={setValues}
                    setIsLoading={setIsLoading}
                />
            </>
        </AuthLayout>
    );
};

export default Index;
