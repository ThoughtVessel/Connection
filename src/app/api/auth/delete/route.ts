import { NextRequest, NextResponse } from 'next/server';
import deleteAccount from '@/actions/auth/delete';
import validateToken from '@/lib/server/token/validate';
import extractToken from '@/lib/server/token/extract'
import hasBody from '@/lib/server/contains-body';
import * as HTTPCode from '@/lib/server/http-code';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';

export async function POST(req: NextRequest) {

  const body = await hasBody(req);

  if (body === false) {
    return HTTPCode.MISSING_BODY();
  }

  const { password } = body;
  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return HTTPCode.UNAUTHORIZED();
  } else if (password.length == 0) {
    return HTTPCode.MISSING_ATTRIBUTE();
  }

  const uid = await validateToken(token);

  if (uid == null) {
    return HTTPCode.BAD_TOKEN();
  }

  const data = await deleteAccount(String(uid), password);

  if (data.status === ActionResponseStatus.ERROR || data.status === ActionResponseStatus.FAILURE_TO_COMPLETE) {
    return HTTPCode.INTERNAL_ERROR();
  } else if (data.status === ActionResponseStatus.WRONG_PASSWORD) {
    return HTTPCode.INVALID_PASSWORD();
  } else if (data.status === ActionResponseStatus.GET_NONEXISTANT) {
    return HTTPCode.NOT_FOUND_('Account');
  }

  return HTTPCode.DELETED_NO_CONTENT();
}
