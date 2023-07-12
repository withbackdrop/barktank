'use client';

import { Note, Card } from '@/modules/application/components/DesignSystem';
import Spinner from '@/modules/common/components/animations/Spinner';
import useProject from '@/modules/projects/hooks/useProject';

import PitchFlow from './PitchFlow';

const PitchFlowContainer = ({ projectId }: { projectId: string }) => {
  const { project, isLoading } = useProject(projectId);
  if (isLoading) {
    return <Spinner align="center" size="l" />;
  }

  if (!project) {
    return (
      <Card>
        <Note color="red" align="center">
          Project not found.
        </Note>
      </Card>
    );
  }

  return <PitchFlow project={project} />;
};

export default PitchFlowContainer;
