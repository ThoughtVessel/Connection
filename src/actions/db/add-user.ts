import prisma from '@/lib/prisma';
import StatusResponse from '@/lib/status-response';
import crypto from 'crypto';

const addUser = async (email: string, passwordHash: string) : Promise<StatusResponse> => {
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
      status: 0
    };

  } catch (err) {
    console.log(err)
  }
  return { status: -1 }
};

export default addUser;
