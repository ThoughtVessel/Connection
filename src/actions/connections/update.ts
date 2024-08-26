/*
Update connection status

@sender_uid: uid extracted from token
@recip_uid: uid sent as param
@accept: change status to accepted/rejected

return ActionResponseStatus
*/

import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';
import getConnection from '@/actions/connections/get';
import updateConnectionDB from '@/actions/db/connections/update-connection';

const updateConnection = async (
  sender_uid: string, recip_uid: string, accept: boolean
) : Promise<StatusResponse>  => {

  try {

    const updated = await updateConnectionDB(sender_uid, recip_uid, accept);

    return updated;

  } catch(err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  }

};

export default updateConnection;
