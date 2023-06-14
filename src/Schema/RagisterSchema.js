import * as Yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const phoneNumberValidator = (message) => Yup.string()
    .matches(phoneRegExp, { message })
    .test('isValidPhoneNumber', 'Invalid phone number', function (value) {
        const { createError, path } = this;
        try {
            const phoneNumber = parsePhoneNumberFromString(value);
            if (!phoneNumber) {
                return createError({ path, message: 'Invalid phone number' });
            }
            return phoneNumber.isValid();
        } catch (error) {
            return createError({ path, message: 'Invalid phone number' });
        }
    });


export const RagisterSchema = Yup.object({
    name: Yup.string().min(3).required('Name is Required'),
    email: Yup.string().email().required('Email is Required, Enter Orignal Email'),
    phoneNumber: phoneNumberValidator('Invalid Phone number'),
    password: Yup.string().min(6).required('Password is required, if you forget your password, change it'),
    confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is Required'),
})