/*
Attempt to create connection if no conflicts

@sender_uid: uid extracted from token
@recip_uid: uid sent as param

return ActionResponseStatus
*/

import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';
import getConnection from '@/actions/connections/get';
import addConnection from '@/actions/db/connections/create-connection';
import getAuth from '@/actions/db/auth/get-auth'

const createConnection = async (
  sender_uid: string, recip_uid: string
) : Promise<StatusResponse>  => {

  try {

    const conn = await getConnection(sender_uid, recip_uid);

    if (conn.status === ActionResponseStatus.ERROR) {

      return conn;

    }

    else if (conn.status === ActionResponseStatus.SUCCESS) {

      return {
        status: ActionResponseStatus.ALREADY_EXISTS
      }

    }

    // Attempt to create a connection with invalid uid
    else if (conn.status === ActionResponseStatus.GET_NONEXISTANT) {

      return {
        status: ActionResponseStatus.INVALID_PARAMETER
      }

    }

    // Forward db response
    const added = await addConnection(sender_uid, recip_uid);

    return added;

  } catch(err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  }
};

export default createConnection;
