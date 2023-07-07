import { Text } from '@/modules/application/components/DesignSystem';

const PersonListItemName = ({ children }: any) => (
  <Text tag="span" size="s" fontWeight="semibold">
    {children}
  </Text>
);

PersonListItemName.role = 'PersonListItem.Name';
PersonListItemName.displayName = 'PersonListItem.Name';

export default PersonListItemName;
