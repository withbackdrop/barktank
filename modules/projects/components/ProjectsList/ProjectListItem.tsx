'use client';

import { getUrlProject } from '@/models/application/services/UrlService';
import { ProjectInterface } from '@/models/projects/interfaces/ProjectInterface';
import { Button, Card, Text } from '@/modules/application/components/DesignSystem';

const ProjectListItem = ({ project }: { project: ProjectInterface }) => (
  <Card>
    <Text size="l" fontWeight="bold" spacing="m">
      {project.name}
    </Text>
    {project.description && <Text spacing="s">{project.description}</Text>}
    <Text spacing="s">{project.youtubeUrl}</Text>
    <Button href={getUrlProject(project.id)}>Pitch</Button>
  </Card>
);

export default ProjectListItem;
