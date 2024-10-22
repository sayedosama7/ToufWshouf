import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAddUserMutation } from '@/store/Register/RegisterApi';
import { Register } from '@/type/type';

export const RegisterHandle = (
    values: Register,
    setValues: React.Dispatch<React.SetStateAction<Register>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const router = useRouter();
    const [addUser] = useAddUserMutation();

    const handleAdd = async () => {
        const newErrors: Register['errors'] = {};

        if (!values.p_Mail) {
            newErrors.p_Mail = 'Email is required';
        }
        if (!values.CNAME) {
            newErrors.CNAME = 'Full name is required';
        }
        if (!values.TEL) {
            newErrors.TEL = 'Phone number is required';
        }
        if (!values.NAT) {
            newErrors.NAT = 'Nationality is required';
        }
        if (!values.C_ADDRESS) {
            newErrors.C_ADDRESS = 'Address is required';
        }
        if (!values.C_PASS) {
            newErrors.C_PASS = 'Password is required';
        } else if (values.C_PASS.length < 6) {
            newErrors.C_PASS = 'Password must be at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setValues(prev => ({ ...prev, errors: newErrors }));
            return;
        }

        const formattedData = {
            p_Mail: values.p_Mail,
            TEL: String(values.TEL),
            CNAME: values.CNAME,
            NAT: String(values.NAT),
            C_ADDRESS: values.C_ADDRESS,
            C_PASS: values.C_PASS,
            RememberMe: values.RememberMe,
        };
        setIsLoading(true);
        try {
            const response = await addUser(formattedData).unwrap();

            if (response?.OTP === 'This Mail already Exist') {
                setValues(prev => ({
                    ...prev,
                    emailError: response.OTP,
                    errors: { ...prev.errors, p_Mail: response.OTP },
                }));
                toast.error(response.OTP);
            } else if (response?.OTP === 'This Phone already Exist') {
                setValues(prev => ({
                    ...prev,
                    errors: { ...prev.errors, TEL: response.OTP },
                }));
                toast.error(response.OTP);
            } else if (response?.OTP === 'Please Review Your Mail') {
                localStorage.setItem('email', values.p_Mail);
                setValues({
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

                toast.success(
                    'Registration successful. Please check your email to verify your account.',
                    {
                        autoClose: 2000,
                    }
                );

                setTimeout(() => {
                    router.push('/VerifyEmail');
                }, 2000);
            } else {
                console.warn('Unexpected response:', response);
                toast.error('Unexpected response from the server.');
            }
        } catch (error) {
            console.error('Error setting up request:', error);
            if (error instanceof Error) {
                toast.error('Request error: ' + error.message);
            } else if (typeof error === 'object' && error !== null && 'response' in error) {
                const responseError = error as { response: { data: { message: string } } };
                toast.error(`Server error: ${responseError.response.data.message}`);
            } else {
                toast.error('Unknown error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { handleAdd };
};
