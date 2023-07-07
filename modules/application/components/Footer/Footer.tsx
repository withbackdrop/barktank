import { format } from 'date-fns';

import { Text } from '@/modules/application/components/DesignSystem';

const Footer = () => (
  <div className="flex items-center justify-between border-t border-yellow-200 bg-yellow-100 p-5">
    <Text size="s">{`© ${format(new Date(), 'yyyy')} Bark Tank`}</Text>
    <Text size="s">by Backdrop Labs</Text>
  </div>
);

export default Footer;
