/* eslint-disable camelcase */

export interface ProjectInterface {
  id: string;
  userId: string;
  roundsPlayed: number;
  createdAt: number;
  updatedAt: number;
  name: string;
  description?: string;
  youtubeUrl: string;
  transcript: string;
}
