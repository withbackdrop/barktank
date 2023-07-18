import { Form, Formik } from 'formik';
import Image from 'next/image';

import barkFull from '@/images/bark-full.png';
import { DifficultyEnum } from '@/models/projects/enums/DifficultyEnum';
import { Card, Select, Text, Heading, Button, Stack } from '@/modules/application/components/DesignSystem';
import { FormikSelectField } from '@/modules/common/components/Formik';

const PitchFlowStart = ({ flowData: { project }, onAccept }: any) => (
  <Card elevation="l">
    <Stack alignItems="center">
      <Stack.Item>
        <Image src={barkFull} alt="Bark Cuban" width={256} height={256} className="rounded-lg" />
      </Stack.Item>
      <Stack.Item>
        <Heading textAlign="center" size="xxl" spacing="s">
          Bark Cuban will see you now.
        </Heading>
      </Stack.Item>
      <Stack.Item>
        <Text textAlign="center" spacing="l">
          He will watch your pitch demo video and decide if he wants to invest in your project. You get a few chances to
          convince him and win the game, but beware: he is a tough cookie.
        </Text>
      </Stack.Item>
      <Stack.Item>
        <Formik
          onSubmit={async ({ difficulty }) => onAccept({ difficulty })}
          initialValues={{
            difficulty: DifficultyEnum.NORMAL,
          }}
          validateOnBlur={true}
        >
          {() => (
            <Form>
              <div className="flex w-full flex-col space-y-2">
                <FormikSelectField name="difficulty" label="Difficulty">
                  <Select.Option value={DifficultyEnum.EASY}>🥺 Puppy</Select.Option>
                  <Select.Option value={DifficultyEnum.NORMAL}>🐶 Labradoodle</Select.Option>
                  <Select.Option value={DifficultyEnum.HARD}>🙅‍♀️ Pitbull</Select.Option>
                </FormikSelectField>
                <Button size="m" type="submit" width="full">
                  Let's woof!
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Stack.Item>
      <Stack.Item>
        <Text>You're pitching {project.name}. Good luck!</Text>
      </Stack.Item>
    </Stack>
  </Card>
);

export default PitchFlowStart;
