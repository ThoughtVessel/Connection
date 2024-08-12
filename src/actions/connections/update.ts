import StatusResponse from '@/lib/status-response';
import getConnection from '@/actions/connections/get';
import updateConnectionDB from '@/actions/db/connections/update-connection';

// Status 0 success, -1 error, 1 connection doesn't exists,
const updateConnection = async (sender_uid: string, recip_uid: string, accept: bool) : Promise<StatusResponse>  => {
  try {
    const updated = await updateConnectionDB(sender_uid, recip_uid, accept);
    return updated;
  } catch(err) {
    console.log(err);
  }
  return { status: -1 }
};

export default updateConnection;
