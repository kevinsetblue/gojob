import * as Yup from 'yup';

export const SignInGoJob = Yup.object({
    email: Yup.string().email().required('Email is Required'),
    password: Yup.string().min(6).required('Password is required, if you forget your password, change it')
})