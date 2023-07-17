import { useEffect, useState } from 'react';

import { ProjectInterface } from '@/models/projects/interfaces/ProjectInterface';
import { getProjectsByUserId } from '@/models/projects/services/ProjectService';

const useUserProjects = (userId: string) => {
  const [projects, setProjects] = useState<ProjectInterface[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const foundProjects = await getProjectsByUserId(userId);
      if (foundProjects) {
        setProjects(foundProjects);
      }

      setIsLoading(false);
    })();
  }, []);

  return { projects, isLoading };
};

export default useUserProjects;
