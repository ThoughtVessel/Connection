import { NextRequest, NextResponse } from 'next/server';
import validateToken from '@/lib/server/token/validate';
import extractToken from '@/lib/server/token/extract';
import hasBody from '@/lib/server/contains-body';
import SearchSortKeys from '@/lib/server/enum/search-sort-keys';
import getBulkConnections from '@/actions/connections/get-bulk';
import * as HTTPCode from '@/lib/server/http-code';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';


export async function GET(req: NextRequest) {
  const body = await hasBody(req);

  const { count=10, index=0, sortby='ALPHABETICAL', status='UNKNOWN' } = body;

  if (!(Number.isInteger(count) && Number.isInteger(index) && count >= 0 && index >= 0 && Object.values(SearchSortKeys).includes(sortby))) {
    return HTTPCode.INVALID_('request');
  }

  const token = await extractToken(req);

  if (token === null || token.length == 0) {
    return HTTPCode.UNAUTHORIZED();
  }

  const uid = await validateToken(token);

  if (uid === null) {
    return HTTPCode.BAD_TOKEN();
  }

  const res = await getBulkConnections(uid, count, index, sortby, status);

  if (res.status === ActionResponseStatus.ERROR) {
    return HTTPCode.INTERNAL_ERROR();
  }

  return HTTPCode.OK_(res.data);
}
