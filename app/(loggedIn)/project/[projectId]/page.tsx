import { Metadata } from 'next';

import { ContentLayout } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import { Header } from '@/modules/application/components/Header';
import { PitchFlowContainer } from '@/modules/projects/components/PitchFlow';

export const metadata: Metadata = {
  title: 'Bark Tank',
  description: 'Woof woof!',
};

export default async function projectPage({ params: { projectId } }: { params: { projectId: string } }) {
  return (
    <ContentLayout>
      <ContentLayout.Header>
        <Header />
      </ContentLayout.Header>
      <ContentLayout.Content>
        <div className="m-auto flex min-h-screen max-w-4xl flex-col">
          <PitchFlowContainer projectId={projectId} />
        </div>
      </ContentLayout.Content>
      <ContentLayout.Footer>
        <Footer />
      </ContentLayout.Footer>
    </ContentLayout>
  );
}
