import StatusResponse from '@/lib/status-response';
import getConnection from '@/actions/connections/get';
import addConnection from '@/actions/db/connections/add-connection';


// Status 0 success, -1 error, 1 connection already exists, 2 invalid recip uid
const createConnection = async (sender_uid: string, recip_uid: string) : Promise<StatusResponse>  => {
  try {
    const conn = await getConnection(sender_uid, recip_uid);
    if (conn.status < 0) {
      return conn;
    } else if (conn.status === 0) {
      return { status: 1}
    } else if (conn.status === 2) {
      return {status:2 }
    }
    const added = await addConnection(sender_uid, recip_uid);
    return added;
  } catch(err) {
    console.log(err);
  }
  return { status: -1 }
};

export default createConnection;
