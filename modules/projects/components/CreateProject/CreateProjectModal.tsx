'use client';

import { useRouter } from 'next/navigation';

import { getUrlProject } from '@/models/application/services/UrlService';
import { Modal } from '@/modules/application/components/DesignSystem';
import { Heading } from '@/modules/application/components/DesignSystem/Elements';

import CreateProjectForm from './CreateProjectForm';

const CreateProjectModal = ({ isOpen, onRequestClose }: { isOpen: boolean; onRequestClose: () => void }) => {
  const { push } = useRouter();
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Modal.Body>
        <Heading level={1} size="xl" spacing="xl">
          Start a new game
        </Heading>
        <CreateProjectForm onCreated={(documentId) => push(getUrlProject(documentId))} />
      </Modal.Body>
    </Modal>
  );
};

export default CreateProjectModal;
