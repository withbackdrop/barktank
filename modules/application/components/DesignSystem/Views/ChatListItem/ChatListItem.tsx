import findChildByRole from '@/modules/application/utils/findChildByRole';

import Body from './subcomponents/ChatListItemBody';
import Image from './subcomponents/ChatListItemImage';
import Subject from './subcomponents/ChatListItemSubject';

import { Stack } from '../../Layouts';

interface ChatListItemInterface {
  children: any;
}

const ChatListItem = ({ children }: ChatListItemInterface) => {
  const image = findChildByRole(children, 'ChatListItem.Image');
  const subject = findChildByRole(children, 'ChatListItem.Subject');
  const body = findChildByRole(children, 'ChatListItem.Body');

  return (
    <Stack spacing="xxs">
      <Stack.Item>
        <div className="flex flex-row space-x-2">
          {image && <div>{image}</div>}
          <div>{subject}</div>
        </div>
      </Stack.Item>
      <Stack.Item>{body}</Stack.Item>
    </Stack>
  );
};

export default Object.assign(ChatListItem, { Image, Body, Subject });
