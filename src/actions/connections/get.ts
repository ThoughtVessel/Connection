import getConnectionDB from '@/actions/db/connections/get-connection';
import getAuth from '@/actions/db/uid/get-auth';
import StatusResponse from '@/lib/status-response';

// Status 0 success, -1 error, 1 connection doesnt exist, 2 uid invalid
const getConnection = async (send_uid: string, req_uid: string) : Promise<StatusResponse>  => {
  try {
    if ((await getAuth(req_uid)).status != 0) {
      return { status: 2 };
    }

    const conn = await getConnectionDB(send_uid, req_uid);
    if (conn.status == 1) {
      return { status: 1 };
    } else if (conn.status === 0) {
      return conn;
    }
  } catch(err) {
    console.log(err);
  }
  return { status: -1 }
};

export default getConnection;
