/*
If user id exists and valid password to given account, delete Account
STILL NEEDS WORK TO DELETE ALL OTHER TABLE ENTREES ASSOCIATED WITH THE ACCT

@uid: user id
@password: password literal

return ActionResponseStatus
*/

import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';
import getAuth from '@/actions/db/auth/get-auth';
import validatePassword from '@/lib/server/verify-password';
import deleteUserDB from '@/actions/db/auth/del-user';

const deleteAccount = async (
  uid: string, password: string
) : Promise<StatusResponse>  => {

  try {
    const user = await getAuth(uid);

    if (
      user.status === ActionResponseStatus.GET_NONEXISTANT ||
      user.status === ActionResponseStatus.ERROR
    ) {

      return user;

    }

    const isAuth = await validatePassword(password, user.password);

    if (!isAuth) {

      return {
        status: ActionResponseStatus.WRONG_PASSWORD
      }

    }

    const { status } = await deleteUserDB(uid);

    if (status === ActionResponseStatus.GET_NONEXISTANT) {

      return {
        status: ActionResponseStatus.FAILURE_TO_COMPLETE
      }

    } else if (status === ActionResponseStatus.SUCCESS) {

      return {
        status: ActionResponseStatus.SUCCESS
      }

    }


  } catch(err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  }

};

export default deleteAccount;
