'use client';

import { useRouter } from 'next/navigation';

import { getUrlProject } from '@/models/application/services/UrlService';
import { Heading } from '@/modules/application/components/DesignSystem/Elements';

import CreateProjectForm from './CreateProjectForm';

const CreateProject = () => {
  const { push } = useRouter();
  return (
    <div className="w-[400px]">
      <Heading level={1} size="xl" spacing="xl">
        Create new project pitch
      </Heading>
      <CreateProjectForm onCreated={(documentId) => push(getUrlProject(documentId))} />
    </div>
  );
};

export default CreateProject;
