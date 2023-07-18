import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { Metadata } from 'next';

import { getUrlHome } from '@/models/application/services/UrlService';
import { Button, ContentLayout } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import { Header } from '@/modules/application/components/Header';
import { PitchFlowContainer } from '@/modules/projects/components/PitchFlow';

export const metadata: Metadata = {
  title: 'Bark Tank | Project',
  description: 'Woof woof!',
};

export default async function projectPage({ params: { projectId } }: { params: { projectId: string } }) {
  return (
    <ContentLayout>
      <ContentLayout.Header>
        <Header />
      </ContentLayout.Header>
      <ContentLayout.Content>
        <div className="m-auto flex min-h-screen max-w-2xl flex-col">
          <div className="mb-5">
            <Button href={getUrlHome()} theme="bare">
              <Button.Icon icon={<ArrowLeftIcon className="w-5" />} />
              Back
            </Button>
          </div>
          <PitchFlowContainer projectId={projectId} />
        </div>
      </ContentLayout.Content>
      <ContentLayout.Footer>
        <Footer />
      </ContentLayout.Footer>
    </ContentLayout>
  );
}
