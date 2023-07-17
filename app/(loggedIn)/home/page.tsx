import { Metadata } from 'next';

import { ContentLayout } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import { Header } from '@/modules/application/components/Header';
import { ProjectsList } from '@/modules/projects/components/ProjectsList';

export const metadata: Metadata = {
  title: 'Bark Tank',
  description: 'Woof woof!',
};

export default async function HomePage() {
  return (
    <ContentLayout>
      <ContentLayout.Header>
        <Header />
      </ContentLayout.Header>
      <ContentLayout.Content>
        <ProjectsList />
      </ContentLayout.Content>
      <ContentLayout.Footer>
        <Footer />
      </ContentLayout.Footer>
    </ContentLayout>
  );
}
