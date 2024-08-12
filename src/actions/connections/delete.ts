import deleteConnectionDB from '@/actions/db/connections/delete-connection';
import StatusResponse from '@/lib/status-response';

// Status 0 success, -1 error, 1 connection doesnt exist, 2 uid invalid
const deleteConnection = async (send_uid: string, req_uid: string) : Promise<StatusResponse>  => {
  try {
    const conn = await deleteConnectionDB(send_uid, req_uid);
    return conn;
  } catch(err) {
    console.log(err);
  }
  return { status: -1 }
};

export default deleteConnection;
