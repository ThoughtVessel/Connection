import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import validateEmail from '@/lib/validate-email';
import register from '@/actions/account/register'
import generateToken from '@/lib/token/generate'
import hasBody from '@/lib/contains-body';

export async function POST(req: NextRequest) {
  const body = await hasBody(req);
  if (body === false) {
    return NextResponse.json({
        error: 'Request must contain a body'
      },{
        status: 400
      });
  }
  const { email, password } = body;

  if (email.length == 0 || password.length == 0) {
    return NextResponse.json({
        error: 'Must enter an email and password'
      },{
        status: 400
      });
  } else if (!validateEmail(email)) {
    return NextResponse.json({
        error: 'Invalid email'
      },{
        status: 400
      });
  }

  const data = await register(email, password);

  if (data.status < 0) {
    return NextResponse.json({
      error: 'Internal service error'
    }, {
      status: 500
    });
  } else if (data.status == 1) {
    return NextResponse.json({
      error: 'Email already in use'
    }, {
      status: 409
    });
  }

  const token = await generateToken(data.uid);

  return NextResponse.json({ token: token }, { status: 200 });
}
