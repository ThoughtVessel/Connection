/*
Attempts to create account if no conflicts

@email: user email
@password: password literal

return ActionResponseStatus
*/

import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';
import addUserAuth from '@/actions/db/auth/add-user';
import createProfile from '@/actions/profile/create';
import getDataFromEmail from '@/actions/db/auth/data-from-email';
import bcrypt from 'bcryptjs';

const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  username: string,
) : Promise<StatusResponse>  => {

  try {

    const existingUser = await getDataFromEmail(email);

    if (existingUser.status === ActionResponseStatus.SUCCESS) {

      return {
        status: ActionResponseStatus.ALREADY_EXISTS,
      }

    }

    else if (existingUser.status === ActionResponseStatus.GET_NONEXISTANT) {

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await addUserAuth(email, passwordHash);

      if (user.status === ActionResponseStatus.SUCCESS) {

        const profile = await createProfile(user.uid, firstName, lastName, username);
        return {
          uid: user.uid,
          status: profile.status
        }

      }

    }
  } catch(err) {

    console.log(err);

  }
  return {
    status: ActionResponseStatus.ERROR
  }
};

export default register;
