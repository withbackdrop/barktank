import { isMobile } from 'react-device-detect';
import ReactInfiniteScrollComponent from 'react-infinite-scroll-component';

import ManualInfiniteScroll from './components/ManualInfiniteScroll';

export enum ModeInterface {
  INFINITE = 'infinite',
  MANUAL = 'manual',
  AUTO = 'auto',
}

interface InfiniteScrollInterface {
  mode?: ModeInterface;
  style?: any;
  dataLength?: number;
  next: () => any;
  hasMore: boolean;
  loader: any;
  children: any;
  scrollableTarget?: string;
  inverse?: boolean;
}

const InfiniteScroll = ({
  style,
  dataLength,
  next,
  hasMore,
  loader,
  children,
  mode = ModeInterface.AUTO,
  scrollableTarget,
  inverse = false,
}: InfiniteScrollInterface) => {
  if (mode === ModeInterface.MANUAL || (mode === ModeInterface.AUTO && isMobile)) {
    return (
      <ManualInfiniteScroll next={next} hasMore={hasMore} inverse={inverse}>
        {children}
      </ManualInfiniteScroll>
    );
  }

  return (
    <ReactInfiniteScrollComponent
      style={style}
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={loader}
      scrollableTarget={scrollableTarget}
      inverse={inverse}
    >
      {children}
    </ReactInfiniteScrollComponent>
  );
};

export default InfiniteScroll;
