import { Avatar } from '@/modules/application/components/DesignSystem';

const PersonListItemImage = ({ src, alt, size = 'm' }: any) => <Avatar src={src} alt={alt} size={size} />;

PersonListItemImage.role = 'PersonListItem.Image';
PersonListItemImage.displayName = 'PersonListItem.Image';

export default PersonListItemImage;
