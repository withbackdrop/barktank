/* eslint-disable camelcase */

export interface ProjectInterface {
  id: number;
  userId: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  description?: string;
  youtubeUrl: string;
  transcript: string;
}
