'use client';

import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button } from '@/modules/application/components/DesignSystem';
import { FormikTextareaField } from '@/modules/common/components/Formik';

import { REPLY_MIN_LENGTH, REPLY_MAX_LENGTH } from './utils/constants';

const validationSchema = yup.object().shape({
  text: yup
    .string()
    .trim()
    .min(REPLY_MIN_LENGTH, `Reply should be at least ${REPLY_MIN_LENGTH} characters`)
    .max(REPLY_MAX_LENGTH, `Reply should be at at most ${REPLY_MAX_LENGTH} characters`)
    .required('Enter your reply'),
});

const PitchReplyForm = ({ onSubmit }: { onSubmit: (text) => any }) => (
  <Formik
    onSubmit={async ({ text }, { resetForm }) => {
      try {
        onSubmit(text);
        resetForm();
      } catch (error: any) {
        toast.error('Reply could not be submitted.');
      }
    }}
    initialValues={{
      text: '',
    }}
    validateOnBlur={true}
    validationSchema={validationSchema}
  >
    {({ isSubmitting }) => (
      <Form>
        <div className="flex w-full flex-col space-y-4">
          <div className="w-full">
            <FormikTextareaField size="m" name="text" placeholder="Give Bark a great answer!" rows={2} />
          </div>
          <Button size="m" type="submit" status={isSubmitting ? 'busy' : ''} width="full">
            Reply to Bark
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default PitchReplyForm;
