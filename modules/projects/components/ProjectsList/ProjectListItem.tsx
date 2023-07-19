'use client';

import { getUrlProject } from '@/models/application/services/UrlService';
import { ProjectInterface } from '@/models/projects/interfaces/ProjectInterface';
import { Button, Card, Note, Text } from '@/modules/application/components/DesignSystem';
import { MAX_ROUNDS_PER_PROJECT } from '@/modules/projects/utils/constants';

const ProjectListItem = ({ project }: { project: ProjectInterface }) => (
  <Card>
    <div className="flex grow flex-col">
      <Text size="l" fontWeight="bold" spacing="m">
        {project.name}
      </Text>
      {project.description && <Text spacing="s">{project.description}</Text>}
    </div>

    {project.roundsPlayed < MAX_ROUNDS_PER_PROJECT ? (
      <Button href={getUrlProject(project.id)} width="full">
        Pitch this project
      </Button>
    ) : (
      <Note color="yellow">You cannot pitch this project anymore</Note>
    )}
  </Card>
);

export default ProjectListItem;
