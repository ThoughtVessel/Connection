import { NextRequest, NextResponse } from 'next/server';
import deleteAccount from '@/actions/account/delete';
import validateToken from '@/lib/token/validate';
import extractToken from '@/lib/token/extract'
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

  const { password } = body;
  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return NextResponse.json({
        error: 'Unauthorized'
      }, {
        status: 401
      });
  } else if (password.length == 0) {
    return NextResponse.json({
        error: 'Must enter a password'
      },{
        status: 400
      });
  }

  const uid = await validateToken(token);

  if (uid == null) {
    return NextResponse.json({
      error: 'Invalid token'
    }, {
      status: 400
    });
  }

  const data = await deleteAccount(String(uid), password);

  if (data.status < 0) {
    return NextResponse.json({
      error: 'Internal service error'
    }, {
      status: 500
    });
  } else if (data.status == 1) {
    return NextResponse.json({
      error: 'Malformed token'
    }, {
      status: 400
    });
  } else if (data.status == 2) {
    return NextResponse.json({
      error: 'Invalid Password'
    }, {
      status: 409
    });
  }


  return NextResponse.json({}, { status: 200 });
}
