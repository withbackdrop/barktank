import { Metadata } from 'next';

import { ContentLayout, Heading, Stack } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import { Header } from '@/modules/application/components/Header';

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
        <div className="m-auto mt-10 flex max-w-2xl items-center justify-center md:mt-24">
          <Stack alignItems="center" spacing="xxxl">
            <Stack.Item>
              <Stack spacing="s" alignItems="center">
                <Stack.Item>
                  <Heading level={1} size="xxl" textAlign="center">
                    Bark Tank
                  </Heading>
                </Stack.Item>
                <Stack.Item>
                  <Heading level={3} textAlign="center" size="xl">
                    Let's raise the woof!
                  </Heading>
                </Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        </div>
      </ContentLayout.Content>
      <ContentLayout.Footer>
        <Footer />
      </ContentLayout.Footer>
    </ContentLayout>
  );
}
