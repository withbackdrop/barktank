'use client';

import { getUrlProject } from '@/models/application/services/UrlService';
import { ProjectInterface } from '@/models/projects/interfaces/ProjectInterface';
import { Button, Card, Hyperlink, Text } from '@/modules/application/components/DesignSystem';

const ProjectListItem = ({ project }: { project: ProjectInterface }) => (
  <Card>
    <Text size="l" fontWeight="bold" spacing="m">
      {project.name}
    </Text>
    {project.description && <Text spacing="s">{project.description}</Text>}
    <Text tag="div" spacing="s">
      <Hyperlink href={project.youtubeUrl} target="_blank" color="default">
        YouTube URL
      </Hyperlink>
    </Text>
    <Button href={getUrlProject(project.id)}>Pitch</Button>
  </Card>
);

export default ProjectListItem;
