import findChildByRole from '@/modules/application/utils/findChildByRole';

import Body from './subcomponents/PersonListItemBody';
import Image from './subcomponents/PersonListItemImage';
import Metadata from './subcomponents/PersonListItemMetadata';
import Name from './subcomponents/PersonListItemName';

import { Stack } from '../../Layouts';

interface PersonListItemInterface {
  children: any;
}

const PersonListItem = ({ children }: PersonListItemInterface) => {
  const name = findChildByRole(children, 'PersonListItem.Name');
  const image = findChildByRole(children, 'PersonListItem.Image');
  const metadata = findChildByRole(children, 'PersonListItem.Metadata');
  const body = findChildByRole(children, 'PersonListItem.Body');

  return (
    <div className="flex flex-row space-x-4">
      {image && <div>{image}</div>}
      <Stack spacing="xxs">
        <Stack.Item>
          <Stack spacing="none">
            <Stack.Item>{name}</Stack.Item>
            {metadata && <Stack.Item>{metadata}</Stack.Item>}
          </Stack>
        </Stack.Item>
        {body && <Stack.Item>{body}</Stack.Item>}
      </Stack>
    </div>
  );
};

export default Object.assign(PersonListItem, { Name, Image, Metadata, Body });
