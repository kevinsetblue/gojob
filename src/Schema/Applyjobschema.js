import * as Yup from 'yup';

export const Applyjobresume = Yup.object({
    Name: Yup.string().required('Name is required'),
    Email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits').required('Phone number is required'),
})