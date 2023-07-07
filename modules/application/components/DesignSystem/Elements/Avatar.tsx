'use client';

import { useState, forwardRef } from 'react';

import { CubeIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import Image from 'next/image';

import nextImageDomains from '@/modules/application/constants/nextImageDomains';

interface AvatarInterface {
  alt: string;
  src?: string;
  size: 'xs' | 's' | 'm' | 'l' | 'inherit';
  radius?: 'full' | 'half';
  priority?: boolean;
}

const Avatar = forwardRef<any, any>(
  ({ src, size = 'm', radius = 'full', priority = false, alt }: AvatarInterface, ref) => {
    const avatarClassNames = classNames({
      'relative flex items-center justify-center shrink-0 overflow-hidden': true,
      'transition ease-in-out': true,
      'bg-gray-200/50 dark:bg-zinc-800': true,

      'h-[100%] w-[100%]': size === 'inherit',
      'w-5 h-5': size === 'xs',
      'w-8 h-8': size === 's',
      'w-12 h-12': size === 'm',
      'w-20 h-20': size === 'l',

      'rounded-full': radius === 'full',
      'rounded-md': (size === 's' || size === 'm') && radius === 'half',
      'rounded-lg': size === 'l' && radius === 'half',
    });

    const getImageSize = (avatarSize) => {
      switch (avatarSize) {
        case 'xs':
          return 15;
        case 's':
          return 32;
        case 'l':
          return 80;
        case 'm':
        default:
          return 48;
      }
    };

    const [isError, setIsError] = useState(false);

    // To use Next.JS image optimizations, we need to ensure a safe domain.
    // This is checking for it as using a non-safe domain with <Image> breaks things!
    const isSafeDomain = src && typeof src === 'string' ? nextImageDomains.includes(new URL(src).hostname) : true;

    return (
      <div className={avatarClassNames} ref={ref}>
        {(!src || isError) && <CubeIcon className="w-3/4 text-gray-400 dark:text-gray-500" />}

        {src && !isError && isSafeDomain && (
          <Image
            src={src}
            alt={alt}
            height={getImageSize(size)}
            width={getImageSize(size)}
            priority={priority}
            quality={80}
            onError={() => setIsError(true)}
          />
        )}

        {src && !isError && !isSafeDomain && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} />
        )}
      </div>
    );
  }
);

export default Avatar;
