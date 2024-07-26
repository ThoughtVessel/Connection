import { NextRequest, NextResponse } from 'next/server';
import login from '@/actions/account/login';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validateEmail from '@/lib/validate-email';

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

  const data = await login(email, password);

  if (data.status < 0) {
    return NextResponse.json({
      error: 'Internal service error'
    }, {
      status: 500
    });
  } else if (data.status == 1) {
    return NextResponse.json({
      error: 'Account not found'
    }, {
      status: 404
    });
  } else if (data.status == 2) {
    return NextResponse.json({
      error: 'Invalid Password'
    }, {
      status: 409
    });
  }


  // Generate JWT token
  // const token = generateToken(user);

  return NextResponse.json({ uid: data.uid }, { status: 200 });
}
