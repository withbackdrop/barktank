/* eslint-disable camelcase */

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';

export interface ConversationLogInterface {
  id: string;
  projectId: string;
  actor: ConversationLogActorEnum;
  text: string;
  probability: number;
  createdAt: number;
  updatedAt: number;
}
