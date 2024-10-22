import { setUser } from '@/store/Register/userSlice';
import { Login } from '@/type/type';
import { toast } from 'react-toastify';

const handleLogin = async (
    values: Login,
    setValues: React.Dispatch<React.SetStateAction<Login>>,
    setSubmitError: React.Dispatch<React.SetStateAction<string | null>>,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    loginUser: any,
    dispatch: any,
    router: any,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (!values.Email || !values.Pword) {
        setValues({
            ...values,
            errors: {
                Email: !values.Email ? 'Email is required' : '',
                Pword: !values.Pword ? 'Password is required' : '',
            },
        });
        return;
    }

    try {
        setIsLoading(true);
        const result = await loginUser({ Email: values.Email, Pword: values.Pword });
        if (result.data && result.data.Status) {
            if (result.data.Status === 'please insert Your Regestered Email') {
                setSubmitError('Login failed. This email is not registered.');
                toast.error('This email is not registered. Please check and try again.');
                return;
            } else if (result.data.Status === 'Invalid Password') {
                setSubmitError('Login failed. Invalid credentials.');
                toast.error('Invalid password. Please try again.');
                return;
            }
        }

        if (result.data && result.data.item && result.data.item.length > 0) {
            const user = result.data.item[0];

            const token = user['Token ']?.trim();
            const CustCode = user.CustCode;
            const NAME = user.NAME;
            const TELEPHONE = user.TELEPHONE;

            if (user.CustCode && token) {
                localStorage.setItem('token', token);
                localStorage.setItem('custcode', CustCode);
                localStorage.setItem('NAME', NAME);
                localStorage.setItem('TELEPHONE', TELEPHONE);
                localStorage.setItem('isAuthenticated', 'true');
                setIsAuthenticated(true);

                dispatch(
                    setUser({
                        CustCode: user.CustCode,
                        Email: user.EMAIL,
                        Token: token,
                    })
                );

                toast.success('Login successful!', {
                    autoClose: 2000,
                    className: 'toast-orange',
                });

                setTimeout(() => {
                    router.push('/home');
                }, 2000);
            } else {
                setSubmitError('Invalid login response. Please try again.');
                toast.error('Login failed. Please check your credentials.');
            }
        } else {
            setSubmitError('Login failed. Invalid credentials.');
            toast.error('Invalid email or password. Please try again.');
        }
    } catch (err) {
        console.log('Error:', err);
        setSubmitError('An unexpected error occurred.');
        toast.error('An unexpected error occurred. Please try again.');
    } finally {
        setIsLoading(false);
    }
};

export default handleLogin;
