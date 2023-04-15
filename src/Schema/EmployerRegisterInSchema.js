import * as Yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
export const EmployerRagisterSchema = Yup.object({
    name: Yup.string().min(3).required('Name is Required'),
    email: Yup.string().email().required('Email is Required, Enter Orignal Email'),
    phoneNumber: Yup.string()
        .test('phone', 'Invalid phone number', function (value) {
            const { createError, path } = this;
            try {
                // Use a phone number parsing library to parse and validate the phone number
                const phoneNumber = parsePhoneNumberFromString(value, 'US'); // Replace 'US' with your desired default country
                if (!phoneNumber) {
                    return createError({ path, message: 'Invalid phone number' });
                }
                return phoneNumber.isValid();
            } catch (error) {
                return createError({ path, message: 'Invalid phone number' });
            }
        }),
    password: Yup.string().min(8).required('Password is required'),
    confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is Required'),
})