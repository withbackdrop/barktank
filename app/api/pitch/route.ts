import { NextResponse } from 'next/server';

import { getPitchResponse } from '@/models/projects/services/PitchService';

export async function POST(res) {
  const data = await res.json();

  const response = await getPitchResponse(data.projectId);

  return NextResponse.json(response);
}
