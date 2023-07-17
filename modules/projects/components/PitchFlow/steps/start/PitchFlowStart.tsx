import { Form, Formik } from 'formik';

import { DifficultyEnum } from '@/models/projects/enums/DifficultyEnum';
import { Card, Select, Text, Heading, Button } from '@/modules/application/components/DesignSystem';
import { FormikSelectField } from '@/modules/common/components/Formik';

const PitchFlowStart = ({ flowData: { project }, onAccept }: any) => (
  <Card elevation="l">
    <div className="flex space-x-16">
      <div className="flex min-w-fit flex-col items-center justify-center">
        <Heading textAlign="center" size="xxl" spacing="s">
          Welcome to the Bark Tank
        </Heading>
        <Text textAlign="center" size="xxl" spacing="l">
          Let's raise the woof!
        </Text>
        <Formik
          onSubmit={async ({ difficulty }) => onAccept({ difficulty })}
          initialValues={{
            difficulty: DifficultyEnum.NORMAL,
          }}
          validateOnBlur={true}
        >
          {() => (
            <Form>
              <div className="flex space-x-2">
                <FormikSelectField name="difficulty">
                  <Select.Option value={DifficultyEnum.EASY}>Difficulty: Easy</Select.Option>
                  <Select.Option value={DifficultyEnum.NORMAL}>Difficulty: Normal</Select.Option>
                  <Select.Option value={DifficultyEnum.HARD}>Difficulty: Hard</Select.Option>
                </FormikSelectField>
                <Button size="m" type="submit">
                  Let's Go!
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <Heading textAlign="left" size="xl" spacing="l">
          Your project pitch
        </Heading>
        <Text textAlign="left" size="xl" spacing="xs">
          <strong>Name: </strong>
          {project.name}
        </Text>
        {project.description && (
          <Text textAlign="left" size="xl" spacing="xs">
            <strong>Description: </strong>
            {project.description}
          </Text>
        )}
        <Text textAlign="left" size="xl" spacing="xs">
          <strong>Pitch video: </strong>
          {project.youtubeUrl}
        </Text>
      </div>
    </div>
  </Card>
);

export default PitchFlowStart;
