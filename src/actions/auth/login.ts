/*
Determine whether password matches email

@email: user email
@password: password literal

return ActionResponseStatus
*/

import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';
import getDataFromEmail from '@/actions/db/auth/data-from-email';
import validatePassword from '@/lib/server/verify-password';

const login = async (
  email: string, password: string
) : Promise<StatusResponse>  => {

  try {

    const user = await getDataFromEmail(email);

    if (user.status === ActionResponseStatus.GET_NONEXISTANT) {

      return {
        status: ActionResponseStatus.GET_NONEXISTANT
      };

    }

    if (user.status === ActionResponseStatus.SUCCESS) {

      const isMatch = await validatePassword(password, user.password);

      if (!isMatch) {

        return {
          status: ActionResponseStatus.WRONG_PASSWORD
        };

      }

      return {
        uid: user.uid,
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

export default login;
