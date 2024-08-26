import { NextRequest, NextResponse } from 'next/server';
import login from '@/actions/auth/login';
import validateEmail from '@/lib/server/validate-email';
import generateToken from '@/lib/server/token/generate';
import hasBody from '@/lib/server/contains-body';
import * as HTTPCode from '@/lib/server/http-code';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';


export async function POST(req: NextRequest) {
  const body = await hasBody(req);
  if (body === false) {
    return HTTPCode.MISSING_ATTRIBUTE();
  }

  const { email, password } = body;

  if (email.length == 0 || password.length == 0) {
    return HTTPCode.MISSING_ATTRIBUTE();
  } else if (!validateEmail(email)) {
    return HTTPCode.INVALID_('email');
  }

  const data = await login(email, password);

  if (data.status === ActionResponseStatus.ERROR) {
    return HTTPCode.INTERNAL_ERROR();
  } else if (data.status === ActionResponseStatus.GET_NONEXISTANT) {
    return HTTPCode.NOT_FOUND_('Account');
  } else if (data.status === ActionResponseStatus.WRONG_PASSWORD) {
    return HTTPCode.INVALID_('password');
  }

  const token = await generateToken(data.uid);

  return HTTPCode.OK_({ token: token });
}
