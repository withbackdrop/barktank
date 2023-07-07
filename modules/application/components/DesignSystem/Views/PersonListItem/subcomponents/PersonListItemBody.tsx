import { Text } from '@/modules/application/components/DesignSystem';

const PersonListItemBody = ({ children, lineClamp = 'none' }: any) => (
  <Text color="gray-600" fontFamily="mono" size="s" tag="div" lineClamp={lineClamp}>
    {children}
  </Text>
);

PersonListItemBody.role = 'PersonListItem.Body';
PersonListItemBody.displayName = 'PersonListItem.Body';

export default PersonListItemBody;
