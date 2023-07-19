import { NextResponse } from 'next/server';

import { getPitchDecision } from '@/models/projects/services/PitchService';

export async function POST(res) {
  const data = await res.json();

  const response = await getPitchDecision(data.projectId, data.difficulty);

  return NextResponse.json(response);
}
