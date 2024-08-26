/*
Attempt to delete connection

@sender_uid: uid extracted from token
@recip_uid: uid sent as param

return ActionResponseStatus
*/

import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';
import deleteConnectionDB from '@/actions/db/connections/delete-connection';

const deleteConnection = async (
  sender_uid: string, recip_uid: string
) : Promise<StatusResponse>  => {

  try {

    const conn = await deleteConnectionDB(sender_uid, recip_uid);

    return conn;

  } catch(err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  }

};

export default deleteConnection;
