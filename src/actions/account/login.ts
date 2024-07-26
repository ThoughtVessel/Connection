import getDataFromEmail from '@/actions/db/data-from-email';
import StatusResponse from '@/lib/status-response';
import bcrypt from 'bcryptjs';

// Status 0 success, -1 error, 1 email taken, 2 wrong password
const login = async (email: string, password: string) : Promise<StatusResponse>  => {
  try {
    const user = await getDataFromEmail(email);

    if (user.status === 1) {
      return { status: 1 };
    }
    if (user.status === 0) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return { status: 2 };
      }

      return {
        uid: user.uid,
        status: 0
      }
    }
  } catch(err) {
    console.log(err);
  }
  return { status: -1 }
};

export default login;
