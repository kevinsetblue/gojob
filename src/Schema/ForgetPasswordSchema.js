import * as Yup from 'yup';

export const ForgetPasswordScema = Yup.object({
    email: Yup.string().email().required('Email is Required, Enter Orignal Email'),
})