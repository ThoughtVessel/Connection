import { NextRequest, NextResponse } from 'next/server';
import validateToken from '@/lib/server/token/validate';
import extractToken from '@/lib/server/token/extract';
import getConnection from '@/actions/connections/get';
import createConnection from '@/actions/connections/create';
import updateConnection from '@/actions/connections/update';
import deleteConnection from '@/actions/connections/delete';
import hasBody from '@/lib/server/contains-body';
import getAuth from '@/actions/db/auth/get-auth';
import * as HTTPCode from '@/lib/server/http-code';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const recip_uid = id;

  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return HTTPCode.UNAUTHORIZED();
  }

  const sender_uid = await validateToken(token);

  if (sender_uid == null) {
    return HTTPCode.BAD_TOKEN();
  }

  if (recip_uid == null || (await getAuth(recip_uid)).status !== ActionResponseStatus.SUCCESS) {
    return HTTPCode.INVALID_('uid parameter');
  }

  const connection = await getConnection(sender_uid, recip_uid);

  if (connection.status == 1) {
    return HTTPCode.NOT_FOUND_('Connection');
  } else if (connection.status === ActionResponseStatus.INVALID_PARAMETER) {
    return HTTPCode.INVALID_('uid parameter');
  } else if (connection.status === ActionResponseStatus.ERROR) {
    return HTTPCode.INTERNAL_ERROR();
  }

  return HTTPCode.OK_({sender: connection.sender_uid, receiver: connection.receip_uid, status: connection.req_status});
}

// POST request: Create a new connection
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
	const recip_uid = id;


  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return HTTPCode.UNAUTHORIZED();
  }

  const sender_uid = await validateToken(token);

  if (sender_uid == null) {
    return HTTPCode.BAD_TOKEN();
  }

  if (recip_uid == null || (await getAuth(recip_uid)).status !== ActionResponseStatus.SUCCESS) {
    return HTTPCode.INVALID_('uid parameter');
  }

  const newConnection = await createConnection(sender_uid, recip_uid);

  if (newConnection.status === ActionResponseStatus.ALREADY_EXISTS) {
    return HTTPCode.EXISTS_('Connection');
  } else if (newConnection.status === ActionResponseStatus.INVALID_PARAMETER) {
    return HTTPCode.INVALID_('uid parameter');
  } else if (newConnection.status === ActionResponseStatus.ERROR) {
    return HTTPCode.INTERNAL_ERROR();
  }
  return HTTPCode.CREATED();
}
//
// PATCH request: Update connection status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
	const recip_uid = id;

  const body = await hasBody(req);
  if (body === false) {
    return HTTPCode.MISSING_BODY();
  }

  const { accept } = body;

  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return HTTPCode.UNAUTHORIZED();
  }

  const sender_uid = await validateToken(token);

  if (sender_uid == null) {
    return HTTPCode.BAD_TOKEN();
  }

  if (recip_uid == null || (await getAuth(recip_uid)).status !== ActionResponseStatus.SUCCESS) {
    return HTTPCode.INVALID_('uid parameter');
  }

  const connection = await updateConnection(sender_uid, recip_uid, accept);

  if (connection.status === ActionResponseStatus.GET_NONEXISTANT) {
    return HTTPCode.NOT_FOUND_('Connection')
  }
  else if (connection.status === ActionResponseStatus.ERROR) {
    return HTTPCode.INTERNAL_ERROR();
  }

  return HTTPCode.OK();

}
//
// // DELETE request: Delete connection
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
	const recip_uid = id;


  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return HTTPCode.UNAUTHORIZED();
  }

  const sender_uid = await validateToken(token);

  if (sender_uid == null) {
    return HTTPCode.BAD_TOKEN();
  }
  if (recip_uid == null || (await getAuth(recip_uid)).status !== ActionResponseStatus.SUCCESS) {
    return HTTPCode.INVALID_('uid parameter');
  }

  const connection = await deleteConnection(sender_uid, recip_uid);

  if (connection.status === 1) {
    return HTTPCode.NOT_FOUND_('Connection');
  }
  else if (connection.status < 0) {
    return HTTPCode.INTERNAL_ERROR();
  }

  return HTTPCode.DELETED_NO_CONTENT();
}
