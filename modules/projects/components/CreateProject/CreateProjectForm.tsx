'use client';

import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { TranscriptInternalApiService } from '@/models/common/services/internalApi/TranscriptInternalApiService';
import { createProject } from '@/models/projects/services/ProjectService';
import { Button, Stack } from '@/modules/application/components/DesignSystem';
import { useSessionContext } from '@/modules/application/contexts/SessionContext';
import { FormikInputField, FormikTextareaField } from '@/modules/common/components/Formik';
import { isValidUrl } from '@/modules/common/utils/urlUtils';

import { NAME_MIN_LENGTH, NAME_MAX_LENGTH, DESCRIPTION_MIN_LENGTH, DESCRIPTION_MAX_LENGTH } from './utils/constants';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(NAME_MIN_LENGTH, `Name should be at least ${NAME_MIN_LENGTH} characters`)
    .max(NAME_MAX_LENGTH, `Name should be at at most ${NAME_MAX_LENGTH} characters`)
    .required('Enter a name'),
  description: yup
    .string()
    .trim()
    .min(DESCRIPTION_MIN_LENGTH, `Description should be at least ${DESCRIPTION_MIN_LENGTH} characters`)
    .max(DESCRIPTION_MAX_LENGTH, `Description should be at at most ${DESCRIPTION_MAX_LENGTH} characters`),
  youtubeUrl: yup
    .string()
    .trim()
    .test('isYoutubeUrl', 'Invalid YouTube URL', (value) => (value ? isValidUrl(value) : true))
    .required('Enter a YouTube URL'),
});

const CreateProjectForm = ({ onCreated }: { onCreated: (string) => any }) => {
  const { user } = useSessionContext();

  return (
    <Formik
      onSubmit={async ({ name, description, youtubeUrl }) => {
        try {
          const transcriptService = new TranscriptInternalApiService(true);
          const transcript = await transcriptService.getTranscriptForYoutubeUrl(youtubeUrl);

          const doc = await createProject(user.uid, name, description, youtubeUrl, transcript);

          toast.success(`Project created!`);

          onCreated(doc.id);
        } catch (error: any) {
          toast.error('Project could not be saved.');
        }
      }}
      initialValues={{
        name: '',
        description: '',
        youtubeUrl: '',
      }}
      validateOnBlur={true}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing="l">
            <Stack.Item>
              <div className="w-full">
                <FormikInputField label="Project name" name="name" placeholder="What is your project called?" />
              </div>
            </Stack.Item>
            <Stack.Item>
              <div className="w-full">
                <FormikInputField
                  label="YouTube URL"
                  name="youtubeUrl"
                  placeholder="Enter a YouTube URL to the pitch or demo video"
                />
              </div>
            </Stack.Item>
            <Stack.Item>
              <div className="w-full">
                <FormikTextareaField
                  label="Description"
                  name="description"
                  placeholder="A short description about this project"
                />
              </div>
            </Stack.Item>
            <Stack.Item>
              <div className="flex justify-end">
                <Button size="m" type="submit" status={isSubmitting ? 'busy' : ''}>
                  Start
                </Button>
              </div>
            </Stack.Item>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProjectForm;
