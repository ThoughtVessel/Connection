/*
Get many connections

@uid: user to get connections from
@count: number of connections to receive
@index: page to get connections by
@sortby: criteria to sort connection pages
@status: connection status to receive

return ActionResponseStatus
*/

import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';
import getConnectionBulkDB from '@/actions/db/connections/get-connection-bulk';

const getConnectionBulk = async (
  uid: string, count: number, index: number, sortby: string, status: string
) : Promise<StatusResponse>  => {

  try {

    const conn = await getConnectionBulkDB(uid, count, index, sortby, status);

    return conn;

  } catch(err) {

    console.log(err);

  }
  return {
    status: ActionResponseStatus.ERROR
  }
};

export default getConnectionBulk;
