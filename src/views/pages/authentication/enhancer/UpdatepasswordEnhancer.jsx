import {
    withFormik
} from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        newpassword: Yup.string().required('Please Enter New Password').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "Password must be at least 8 characters Should contain an Uppercase, Lowercase character and numbers"
          ),
        password: Yup.string().required('Please Enter Confirm Password').oneOf([Yup.ref('newpassword'), null], 'Passwords must match'),
    }),
    handleSubmit: (values) => { },
    displayName: 'CustomValidationForm',
    enableReinitialize: true,
});

export default formikEnhancer;