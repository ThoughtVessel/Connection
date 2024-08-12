import { NextRequest, NextResponse } from 'next/server';
import validateToken from '@/lib/token/validate';
import extractToken from '@/lib/token/extract'
import getConnection from '@/actions/connections/get';
import createConnection from '@/actions/connections/create';
import updateConnection from '@/actions/connections/update';
import deleteConnection from '@/actions/connections/delete';


import hasBody from '@/lib/contains-body';

export async function GET(req, { params }) {
  const { recip_uid } = params;

  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return NextResponse.json({
        error: 'Unauthorized'
      }, {
        status: 401
      });
  }

  const sender_uid = await validateToken(token);

  if (sender_uid == null) {
    return NextResponse.json({
      error: 'Invalid token'
    }, {
      status: 400
    });
  }

  const connection = await getConnection(sender_uid, recip_uid);

  if (connection.status == 1) {
    return NextResponse.json({ message: 'Connection not found' }, { status: 404 });
  } else if (connection.status == 2) {
    return NextResponse.json({
      error: 'Invalid uid'
    }, {
      status: 400
    });
  } else if (connection.status < 0) {
    return NextResponse.json({
      error: 'Internal Service Error'
    }, {
      status: 500
    });
  }

  return NextResponse.json({sender: connection.sender_uid, receiver: connection.receip_uid, status: connection.req_status}, { status: 200 });
}

// POST request: Create a new connection
export async function POST(req, { params }) {
  const { recip_uid } = params;

  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return NextResponse.json({
        error: 'Unauthorized'
      }, {
        status: 401
      });
  }

  const sender_uid = await validateToken(token);

  if (sender_uid == null) {
    return NextResponse.json({
      error: 'Invalid token'
    }, {
      status: 400
    });
  }

  const newConnection = await createConnection(sender_uid, recip_uid);

  if (newConnection.status === 1) {
    return NextResponse.json({
      error: 'Connection exists'
    }, {
      status: 409
    });
  } else if (newConnection.status === 2) {
    return NextResponse.json({
      error: 'Invalid uid'
    }, {
      status: 400
    });
  } else if (newConnection.status < 0) {
    return NextResponse.json({
      error: 'Internal Service Error'
    }, {
      status: 500
    });
  }
  return NextResponse.json({},{ status: 201 });
}
//
// PATCH request: Update connection status
export async function PATCH(req, { params }) {
  const { recip_uid } = params;
  const body = await hasBody(req);
  if (body === false) {
    return NextResponse.json({
        error: 'Request must contain a body'
      },{
        status: 400
      });
  }

  const { accept } = body;

  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return NextResponse.json({
        error: 'Unauthorized'
      }, {
        status: 401
      });
  }

  const sender_uid = await validateToken(token);

  if (sender_uid == null) {
    return NextResponse.json({
      error: 'Invalid token'
    }, {
      status: 400
    });
  }

  const connection = await updateConnection(sender_uid, recip_uid, accept);

  if (connection.status === 1) {
    return NextResponse.json({ message: 'Connection not found' }, { status: 404 });
  }
  else if (connection.status < 0) {
    return NextResponse.json({
      error: 'Internal Service Error'
    }, {
      status: 500
    });
  }

  return NextResponse.json({}, { status: 200 });

}
//
// // DELETE request: Delete connection
export async function DELETE(req, { params }) {
  const { recip_uid } = params;

  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return NextResponse.json({
        error: 'Unauthorized'
      }, {
        status: 401
      });
  }

  const sender_uid = await validateToken(token);

  if (sender_uid == null) {
    return NextResponse.json({
      error: 'Invalid token'
    }, {
      status: 400
    });
  }

  const connection = await deleteConnection(sender_uid, recip_uid);

  if (connection.status === 1) {
    return NextResponse.json({ message: 'Connection not found' }, { status: 404 });
  }
  else if (connection.status < 0) {
    return NextResponse.json({
      error: 'Internal Service Error'
    }, {
      status: 500
    });
  }

  return NextResponse.json({}, { status: 200 });
}
