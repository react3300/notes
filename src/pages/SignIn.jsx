import React from 'react'
import { Card } from 'react-bootstrap';
import * as Yup from "yup";
import { ErrorMessage, Form, Formik, FormikProvider,Field, useFormik } from "formik";
import { Form as BootstrapForm, Button } from 'react-bootstrap';
import city from "../assets/images/signin/city.jpg";

const SignIn = () => {

    const BasicDetailSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        // Your form submission logic here
        console.log('Form submitted:', values);
        resetForm();
    };


    return (
        <div>
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <Card className='p-5 border-0 form-hv w-md-50'>
                        <Formik
                                initialValues={initialValues}
                                validationSchema={BasicDetailSchema}
                                onSubmit={handleSubmit}
                            >
                                {formik => (
                                    <FormikProvider value={formik}>
                                        <Form autoComplete="off" className="formik-width" noValidate>
                                            <h4 className='mt-4'><b>Notemi</b></h4>
                                            <h5 className='text-center py-4'><b>Welcome back</b></h5>
                                            <BootstrapForm.Group className="mb-3" controlId="formBasicEmail">
                                                <BootstrapForm.Label>Email</BootstrapForm.Label>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    as={BootstrapForm.Control}
                                                    required
                                                    placeholder="Enter email"
                                                />
                                                <ErrorMessage name="email" component="span" className="field_error" />

                                            </BootstrapForm.Group>

                                            <BootstrapForm.Group className="mb-3" controlId="formBasicPassword">
                                                <BootstrapForm.Label>Password</BootstrapForm.Label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    as={BootstrapForm.Control}
                                                    placeholder="Password"
                                                />
                                                <ErrorMessage name="password" component="span" className="field_error" />
                                            </BootstrapForm.Group>


                                            <Button className="w-100 sign-button border-0" variant="primary" type="submit">
                                               Sign In
                                            </Button>
                                        </Form>
                                    </FormikProvider>
                                )}
                            </Formik>
                        </Card>
                    </div>
                    <div className="col-md-6 col-12">
                        <Card className='p-5 border-0 d-flex align-items-center justify-content-center hv-100'>
                            <h4><b>Organize your notes in a visual way with Notemi. Create your virtual ‘Memory
                                Palace’ to store information in the most efficient way.</b></h4>
                                <img src={city} className='sign-side-img' alt='' />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn