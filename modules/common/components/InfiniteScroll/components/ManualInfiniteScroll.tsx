'use client';

import { useState } from 'react';

import { Button, Stack } from '@/modules/application/components/DesignSystem';

interface ManualInfiniteScrollInterface {
  next: () => any;
  hasMore: boolean;
  children: any;
  inverse?: boolean;
}

const ManualInfiniteScroll = ({ next, hasMore, inverse = false, children }: ManualInfiniteScrollInterface) => {
  const [isLoading, setIsLoading] = useState(false);

  const items = [<Stack.Item key="children">{children}</Stack.Item>];
  if (hasMore) {
    items.push(
      <Stack.Item key="loadMore">
        <Button
          width="full"
          color="gray"
          size="s"
          status={isLoading ? 'busy' : ''}
          onClick={async () => {
            setIsLoading(true);
            await next();
            setIsLoading(false);
          }}
        >
          Show more
        </Button>
      </Stack.Item>
    );
  }

  if (inverse) {
    items.reverse();
  }

  return <Stack spacing="l">{items}</Stack>;
};

export default ManualInfiniteScroll;
