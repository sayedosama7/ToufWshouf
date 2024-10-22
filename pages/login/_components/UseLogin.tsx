import React from 'react';
import LoginFields from './LoginFields';
import { LoginProps } from '@/type/type';

const UseLogin: React.FC<LoginProps> = ({
    values,
    handleChange,
    handleClickShowPassword,
    handleSubmit,
    setRememberMe,
}) => {
    return (
        <LoginFields
            values={values}
            handleChange={handleChange}
            handleClickShowPassword={handleClickShowPassword}
            handleSubmit={handleSubmit}
            setRememberMe={setRememberMe}
            setIsLoading={function (value: React.SetStateAction<boolean>): void {
                throw new Error('Function not implemented.');
            }}
        />
    );
};

export default UseLogin;
