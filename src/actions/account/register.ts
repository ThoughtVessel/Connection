import addUser from '@/actions/db/add-user';
import getDataFromEmail from '@/actions/db/data-from-email';
import StatusResponse from '@/lib/status-response';
import bcrypt from 'bcryptjs';

// Status 0 success, -1 error, 1 email taken
const register = async (email: string, password: string) : Promise<StatusResponse>  => {
  try {
    const existingUser = await getDataFromEmail(email);

    if (existingUser.status === 0) {
      return { status: 1 }
    }
    if (existingUser.status == 1) {
      const passwordHash = await bcrypt.hash(password, 10);

      const user = await addUser(email, passwordHash);

      if (user.status == 0) {
        return {
          uid: user.uid,
          status: 0
        }
      }
    } else {

    }
  } catch(err) {
    console.log(err);
  }
  return { status: -1 }
};

export default register;
