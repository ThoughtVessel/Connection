import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/server/prisma';
import validateEmail from '@/lib/server/validate-email';
import register from '@/actions/auth/register';
import generateToken from '@/lib/server/token/generate';
import checkUsername from '@/actions/db/auth/check-username';
import hasBody from '@/lib/server/contains-body';
import * as HTTPCode from '@/lib/server/http-code';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';

export async function POST(req: NextRequest) {
  const body = await hasBody(req);
  if (body == false) {
    console.log(JSON.stringify(req))
    return HTTPCode.MISSING_BODY();
  }

  const { email, password, firstName, lastName, username  } = body;

  if (email == null || password == null || firstName == null || lastName == null || username == null) {
    return HTTPCode.MISSING_ATTRIBUTE();
  } else if ((await checkUsername(username)).status !== ActionResponseStatus.GET_NONEXISTANT) {
    return HTTPCode.EXISTS_('username');
  } else if (!validateEmail(email)) {
    return HTTPCode.INVALID_('email');
  }

  const data = await register(email, password, firstName, lastName, username);

  if (data.status === ActionResponseStatus.ERROR) {
    return HTTPCode.INTERNAL_ERROR();
  } else if (data.status === ActionResponseStatus.ALREADY_EXISTS) {
    return HTTPCode.EXISTS_('Email');
  }


  const token = await generateToken(data.uid);

  return HTTPCode.OK_({ token: token });
}
