import * as Yup from 'yup';

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const RagisterSchema = Yup.object({
    name: Yup.string().min(3).required('Name is Required'),
    email: Yup.string().email().required('Email is Required, Enter Orignal Email'),
    // phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string().min(8).required('Password is required, if you forget your password, change it'),
    confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is Required'),
})