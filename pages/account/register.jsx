import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Register;

function Register() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {
                alertService.success('Registration successful', true);
                router.push('login');
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h4 className="card-header">Register</h4>
                        <div className="mb-3">
                            <label className="form-label" hidden>First Name</label>
                            <input placeholder="Firstname" name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <i></i>
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" hidden>Last Name</label>
                            <input placeholder="Lastname" name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <i></i>
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
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
                        <div className='links'>
                            <Link href="/account/login" className="btn btn-link">Cancel</Link>
                            <button disabled={formState.isSubmitting} className="btn btn-primary">
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
