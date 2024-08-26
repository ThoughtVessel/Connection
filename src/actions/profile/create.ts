/*
Attempt to create profile

@sender_uid: uid extracted from token
@recip_uid: uid sent as param

return ActionResponseStatus
*/

import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';
import createProfileDB from '@/actions/db/profile/create';

const createProfile = async (
  uid: string, firstName: string, lastName: string, username: string
) : Promise<StatusResponse>  => {

  try {

    const prof = await createProfileDB(uid, firstName, lastName, username);

    return prof;

  } catch(err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  }
};

export default createProfile;
