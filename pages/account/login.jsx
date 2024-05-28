import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Login;



function Login() {
    const router = useRouter();

    // if admin try to login
    const [isAdmin, setIsAdmin] = useState(false);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    useEffect(() => {
        const isAdmin = true; // Check if the user is an admin
        if (!isAdmin) {
            router.push('/login.jsx'); 
        }
    }, []);

    const handleRadioChange = (e) => {
        setIsAdmin(e.target.value === 'admin');
    };
    
    const handleLogin = () => {
        router.push('/admin-dashboard');
    };
    
    function onSubmit({ username, password }) {
        alertService.clear();
        return userService.login(username, password)
        .then(() => {
            // get return url from query parameters or default to '/'
            const returnUrl = router.query.returnUrl || '/';
            router.push(returnUrl);
        })
        .catch(alertService.error);
    }
    
    return (
        <Layout>
            <div className='login-page'>
                <div class="welcome">
                    <h1>Welcome to Resume Builder, <br/></h1>
                    <p>Create your own resume in few minutes with AI suggestion</p>
                    <img src="https://www.w3schools.com/images/picture.jpg" alt="not" className='login-image' />
                    
                </div>    
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h4 className="card-header">Sign in to Resume Builder</h4>
                            <h4 className="card-header">{isAdmin ? 'Admin Login' : 'Login'}</h4>
                            <div className='inputs'>
                                <div className="mb-3">
                                    <label className="form-label" hidden>Username</label>
                                    <input placeholder="Username" name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                                    <i></i>
                                    <div className="invalid-feedback">{errors.username?.message}</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" hidden>Password</label>
                                    <input placeholder="Password" name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                    <i></i>
                                    <div className="invalid-feedback">{errors.password?.message}</div>
                                </div>

                            </div>
                            <div className='links'>
                                <Link href="/account/register" className="btn btn-link">Register</Link>
                                <button disabled={formState.isSubmitting} className="btn btn-primary">
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                                    Login
                                </button>
                            </div>
                            <div className='user_info'>
                                <label>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="user"
                                    checked={!isAdmin}
                                    onChange={handleRadioChange}
                                />
                                    User
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="admin"
                                        checked={isAdmin}
                                        onChange={handleRadioChange}
                                    />
                                    Admin
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}