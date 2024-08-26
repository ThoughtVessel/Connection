import prisma from '@/lib/server/prisma';
import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';
import crypto from 'crypto';

const addUserAuth = async (
  email: string, passwordHash: string,
) : Promise<StatusResponse> => {

  try {

    const user = await prisma.auth.create({
      data: {
        uid: crypto.randomUUID(),
        email: email,
        password: passwordHash,
      },
    });

    return {
      uid: user.uid,
      status: ActionResponseStatus.SUCCESS
    };

  } catch (err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  }

};

export default addUserAuth;
