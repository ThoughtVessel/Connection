/*
Get individual connection

@sender_uid: uid extracted from token
@recip_uid: uid sent as param

return ActionResponseStatus
*/

import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';
import getConnectionDB from '@/actions/db/connections/get-connection';
import getAuth from '@/actions/db/auth/get-auth';

const getConnection = async (sender_uid: string, recip_uid: string) : Promise<StatusResponse>  => {
  try {

    if ((await getAuth(recip_uid)).status !== ActionResponseStatus.SUCCESS) {

      return {
        status: ActionResponseStatus.INVALID_PARAMETER
      };

    }

    const conn = await getConnectionDB(sender_uid, recip_uid);

    return conn;

  } catch(err) {

    console.log(err);

  }
  return {
    status: ActionResponseStatus.ERROR
  }
};

export default getConnection;
