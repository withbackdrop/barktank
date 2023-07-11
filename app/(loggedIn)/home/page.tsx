import { Metadata } from 'next';

import { ContentLayout } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import { Header } from '@/modules/application/components/Header';
import { CreateProject } from '@/modules/projects/components/CreateProject';

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
        <div className="flex items-center justify-center">
          <CreateProject />
        </div>
      </ContentLayout.Content>
      <ContentLayout.Footer>
        <Footer />
      </ContentLayout.Footer>
    </ContentLayout>
  );
}
