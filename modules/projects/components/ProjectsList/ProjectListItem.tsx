'use client';

import { getUrlProject } from '@/models/application/services/UrlService';
import { ProjectInterface } from '@/models/projects/interfaces/ProjectInterface';
import { Button, Card, Hyperlink, Text } from '@/modules/application/components/DesignSystem';

const ProjectListItem = ({ project }: { project: ProjectInterface }) => (
  <Card>
    <div className="flex flex-col grow">
      <Text size="l" fontWeight="bold" spacing="m">
        {project.name}
      </Text>
      {project.description && <Text spacing="s">{project.description}</Text>}
    </div>

    <Button href={getUrlProject(project.id)} width="full">
      Pitch this project
    </Button>
  </Card>
);

export default ProjectListItem;
