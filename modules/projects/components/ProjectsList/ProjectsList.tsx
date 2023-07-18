'use client';

import { Heading } from '@/modules/application/components/DesignSystem/Elements';
import { useSessionContext } from '@/modules/application/contexts/SessionContext';
import Spinner from '@/modules/common/components/animations/Spinner';
import { CreateProject } from '@/modules/projects/components/CreateProject';
import useUserProjects from '@/modules/projects/hooks/useUserProjects';

import ProjectListItem from './ProjectListItem';

const ProjectsList = () => {
  const { user } = useSessionContext();
  const { projects, isLoading } = useUserProjects(user.uid);
  return (
    <div className="m-auto w-full max-w-5xl">
      <Heading level={1} size="xxl" spacing="xl">
        Your projects
      </Heading>
      {isLoading && <Spinner size="l" align="center" />}
      {!isLoading && projects?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
          <CreateProject />
        </div>
      )}
      {!isLoading && projects?.length === 0 && (
        <div className="flex items-center justify-center">
          <CreateProject />
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
