import PersonListItem from './PersonListItem';
import PersonListItemBody from './subcomponents/PersonListItemBody';
import PersonListItemImage from './subcomponents/PersonListItemImage';
import PersonListItemMetadata from './subcomponents/PersonListItemMetadata';
import PersonListItemName from './subcomponents/PersonListItemName';

PersonListItem.Image = PersonListItemImage;
PersonListItem.Name = PersonListItemName;
PersonListItem.Metadata = PersonListItemMetadata;
PersonListItem.Body = PersonListItemBody;

export { PersonListItem };
