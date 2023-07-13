/* eslint-disable camelcase */

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';

export interface ConversationLogInterface {
  id: number;
  projectId: string;
  actor: ConversationLogActorEnum;
  text: string;
  createdAt: number;
  updatedAt: number;
}
