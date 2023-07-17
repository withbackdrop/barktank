'use client';

import { useState } from 'react';

import { Card } from '@/modules/application/components/DesignSystem';
import { Button, Heading } from '@/modules/application/components/DesignSystem/Elements';
import CreateProjectModal from '@/modules/projects/components/CreateProject/CreateProjectModal';

const CreateProject = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <Card>
      <div className="m-auto flex h-full flex-col justify-center">
        <Heading level={1} size="xl" spacing="m" textAlign="center">
          Create new project pitch
        </Heading>
        <Button onClick={() => setIsModalOpen(true)}>Create</Button>
        <CreateProjectModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
      </div>
    </Card>
  );
};

export default CreateProject;
