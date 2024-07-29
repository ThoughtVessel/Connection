import getAuth from '@/actions/db/uid/get-auth';
import StatusResponse from '@/lib/status-response';
import validatePassword from '@/lib/verify-password';
import deleteUserDB from '@/actions/db/uid/del-user';

// Status 0 success, -1 error, -2 failure to delete, 1 bad token, 2 bad password
const deleteAccount = async (uid: string, password: string) : Promise<StatusResponse>  => {
  try {
    const user = await getAuth(uid);

    if (user.status > 0) {
      return { status: 1 }
    } else if (user.status < 0) {
      return { status: -1 }
    }

    const isAuth = await validatePassword(password, user.password);

    if (!isAuth) {
      return { status: 2 }
    }

    const { status } = await deleteUserDB(uid);

    if (status === 1) {
      return { status: -2 }
    } else if (status === 0) {
      return { status: 0 }
    }


  } catch(err) {
    console.log(err);
  }
  return { status: -1 }
};

export default deleteAccount;
