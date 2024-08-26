import { NextRequest, NextResponse } from 'next/server';
import * as HTTPCode from '@/lib/server/http-code';
import getProfileDB from '@/actions/db/profile/get';
import extractToken from '@/lib/server/token/extract';
import validateToken from '@/lib/server/token/validate';

export async function GET(req: NextRequest) {
  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return HTTPCode.UNAUTHORIZED();
  }

  const sender_uid = await validateToken(token);

  if (sender_uid == null) {
    return HTTPCode.BAD_TOKEN();
  }

  const d = await getProfileDB(sender_uid)

  return HTTPCode.OK_(d);
}
