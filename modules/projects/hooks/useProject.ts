import { useEffect, useState } from 'react';

import { ProjectInterface } from '@/models/projects/interfaces/ProjectInterface';
import { getProjectById } from '@/models/projects/services/ProjectService';

const useProject = (projectId: string) => {
  const [project, setProject] = useState<ProjectInterface>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const foundProject = await getProjectById(projectId);
      if (foundProject) {
        setProject(foundProject);
      }

      setIsLoading(false);
    })();
  }, []);

  return { project, isLoading };
};

export default useProject;
