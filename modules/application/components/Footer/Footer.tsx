import { format } from 'date-fns';

import { Text } from '@/modules/application/components/DesignSystem';

const Footer = () => (
  <div className="flex items-center justify-between p-5">
    <Text color="gray-400" size="s">{`© ${format(new Date(), 'yyyy')} Bark Tank`}</Text>
    <Text size="s" color="gray-400">
      A game by Backdrop Labs
    </Text>
  </div>
);

export default Footer;
