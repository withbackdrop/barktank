'use client';

import { useState } from 'react';

import CreateProjectModal from '@/modules/projects/components/CreateProject/CreateProjectModal';

const CreateProject = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="m-auto flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-4 border-zinc-700 hover:border-white text-5xl text-zinc-500 hover:text-white font-bold transition-all ease-in-out"
      >
        +
      </div>
      <CreateProjectModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CreateProject;
