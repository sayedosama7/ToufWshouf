export interface Register {
    p_Mail: string;
    CNAME: string;
    TEL: string;
    NAT: string | number;
    C_ADDRESS: string;
    C_PASS: string;
    showPassword: boolean;
    RememberMe: boolean;
    emailError: string;
    errors: {
        p_Mail?: string;
        CNAME?: string;
        TEL?: string;
        NAT?: string;
        C_ADDRESS?: string;
        C_PASS?: string;
    };
}

export interface RegisterProps {
    handleAdd: () => Promise<void>;
    values: Register;
    handleChange: (prop: keyof Register) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickShowPassword: () => void;
    setValues: React.Dispatch<React.SetStateAction<Register>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

}

export interface UseAddProps {
    values: Register;
    setValues: React.Dispatch<React.SetStateAction<Register>>;
}

export interface Login {
    Email: string;
    Pword: string;
    showPassword: boolean;
    rememberMe: boolean;
    errors: {
        Email?: string;
        Pword?: string;
    };
}

export interface LoginProps {
    values: Login; 
    handleChange: (prop: keyof Login) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickShowPassword: () => void;
    handleSubmit: () => Promise<void>; 
    setRememberMe: (checked: boolean) => void;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface VerifyEmailHandlerProps {
    OTP: number | '';
    email: string;
    phone: string;
    setOtpError: React.Dispatch<React.SetStateAction<string | null>>;
    setEmailError: React.Dispatch<React.SetStateAction<string | null>>;
    setPhoneError: React.Dispatch<React.SetStateAction<string | null>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface VerificationFormProps {
    OTP: number | '';
    email: string;
    phone: string;
    setOTP: React.Dispatch<React.SetStateAction<number | ''>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    otpError: string | null;
    emailError: string | null;
    phoneError: string | null;
    setOtpError: React.Dispatch<React.SetStateAction<string | null>>;
    setEmailError: React.Dispatch<React.SetStateAction<string | null>>;
    setPhoneError: React.Dispatch<React.SetStateAction<string | null>>;
}
