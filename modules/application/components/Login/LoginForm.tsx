'use client';

import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { FIREBASE_CONSTANT_AUTH_USER_NOT_FOUND } from '@/firebase/firebaseConstants';
import { login } from '@/models/application/services/AuthenticationService';
import { getUrlHome, windowRedirect } from '@/models/application/services/UrlService';
import { Button, Stack } from '@/modules/application/components/DesignSystem';
import { PASSWORD_MIN_LENGTH } from '@/modules/application/constants/constants';
import { FormikInputField } from '@/modules/common/components/Formik';

const validationSchema = yup.object().shape({
  email: yup.string().email().trim().required('Enter your email'),
  password: yup
    .string()
    .trim()
    .min(PASSWORD_MIN_LENGTH, `Password should be at least ${PASSWORD_MIN_LENGTH} characters long`)
    .required('Enter a password'),
});

const LoginForm = () => (
  <Formik
    onSubmit={async ({ email, password }) => {
      try {
        await login(email, password);
        windowRedirect(getUrlHome());
      } catch (error: any) {
        if (error.code === FIREBASE_CONSTANT_AUTH_USER_NOT_FOUND) {
          toast.error('No account found.');
        }
      }
    }}
    initialValues={{ email: '', password: '' }}
    validateOnBlur={true}
    validationSchema={validationSchema}
  >
    {({ isSubmitting }) => (
      <Form>
        <Stack spacing="m">
          <Stack.Item>
            <FormikInputField type="email" name="email" placeholder="Enter your email" />
          </Stack.Item>
          <Stack.Item>
            <FormikInputField type="password" name="password" placeholder="Enter your password" />
          </Stack.Item>
          <Stack.Item>
            <Button size="m" type="submit" width="full" status={isSubmitting ? 'busy' : ''}>
              Login
            </Button>
          </Stack.Item>
        </Stack>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
