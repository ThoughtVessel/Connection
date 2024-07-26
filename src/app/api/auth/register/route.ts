import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import validateEmail from '@/lib/validate-email';
import register from '@/actions/account/register'


export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

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

  // const token = generateToken(newUser);



  return NextResponse.json({ uid: data.uid }, { status: 200 });
}
