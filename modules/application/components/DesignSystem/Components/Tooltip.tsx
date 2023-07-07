'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { LazyTippy } from '@/modules/application/components/LazyTippy';

interface TooltipInterface {
  children: any;
  target: any;
  spacing?: 'none' | 's' | 'm' | 'l';
  size?: 's' | 'm' | 'l';
  width?: 'auto' | 'full';
  isInteractive?: boolean;
  scope?: 'local' | 'global';
  placement?: 'top' | 'bottom';
}

const Tooltip = ({
  children,
  spacing = 'm',
  target,
  size = 'm',
  width = 'auto',
  placement = 'bottom',
  isInteractive = false,
  scope = 'local',
}: TooltipInterface) => {
  const [body, setBody] = useState(null);
  useEffect(() => {
    setBody(document.body);
  }, []);

  const className = classNames({
    'shadow-gray-900/10 dark:shadow-zinc-900/50': true,
    'relative bg-gray-50 text-gray-900 dark:bg-zinc-800 dark:text-zinc-100 border dark:border-zinc-700': true,

    'p-0': spacing === 'none',
    'p-1': spacing === 's',
    'px-3 py-2': spacing === 'm',
    'p-6': spacing === 'l',

    // sizes
    'rounded-lg max-w-xxs shadow-lg': size === 's',
    'rounded-xl max-w-xs shadow-xl': size === 'm',
    'rounded-xl max-w-sm shadow-xl': size === 'l',

    // width
    'w-max': width === 'full',
  });

  return (
    <LazyTippy
      content={
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={className}>
            {children}
          </motion.div>
        </AnimatePresence>
      }
      maxWidth="none"
      placement={placement}
      interactive={isInteractive}
      appendTo={scope === 'global' ? body : 'parent'}
    >
      {target}
    </LazyTippy>
  );
};

export default Tooltip;
