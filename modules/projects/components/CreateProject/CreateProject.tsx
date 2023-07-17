'use client';

import { useState } from 'react';

import { Card } from '@/modules/application/components/DesignSystem';
import { Button, Heading } from '@/modules/application/components/DesignSystem/Elements';
import CreateProjectModal from '@/modules/projects/components/CreateProject/CreateProjectModal';

const CreateProject = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <Card>
      <Heading level={1} size="xl" spacing="xl" textAlign="center">
        Create new project pitch
      </Heading>
      <Button onClick={() => setIsModalOpen(true)}>Create new project</Button>
      <CreateProjectModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
    </Card>
  );
};

export default CreateProject;
