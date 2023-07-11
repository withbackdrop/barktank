'use client';

import { Heading } from '@/modules/application/components/DesignSystem/Elements';

import CreateProjectForm from './CreateProjectForm';

const CreateProject = () => (
  <div className="w-[400px]">
    <Heading level={1} size="xl" spacing="xl">
      Create new project
    </Heading>
    <CreateProjectForm onCreated={() => console.log(1)} />
  </div>
);

export default CreateProject;
