import * as Yup from 'yup';

export const Adminloginschema = Yup.object({
    email: Yup.string().email().required('Email is Required'),
    password: Yup.string().min(10).required('Password is required, if you forget your password, change it')
})