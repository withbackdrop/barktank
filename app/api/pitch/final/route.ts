import { NextResponse } from 'next/server';

import { getPitchFinalDecision } from '@/models/projects/services/PitchService';

export async function POST(res) {
  const data = await res.json();

  const response = await getPitchFinalDecision(data.projectId, data.difficulty);

  return NextResponse.json(response);
}
