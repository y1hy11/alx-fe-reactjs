import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});

const FormikForm = () => {
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log('Form submitted:', values);
        // Simulate API call
        setTimeout(() => {
            alert('Registration successful!');
            resetForm();
            setSubmitting(false);
        }, 1000);
    };

    return (
        <div>
            <h2>User Registration</h2>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <Field
                                type="text"
                                id="username"
                                name="username"
                            />
                            <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                            />
                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                            />
                            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormikForm;