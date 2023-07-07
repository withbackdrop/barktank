import { Text } from '@/modules/application/components/DesignSystem';

const PersonListItemMetadata = ({ children }: any) => (
  <Text tag="span" size="s" color="gray-400">
    {children}
  </Text>
);

PersonListItemMetadata.role = 'PersonListItem.Metadata';
PersonListItemMetadata.displayName = 'PersonListItem.Metadata';

export default PersonListItemMetadata;
