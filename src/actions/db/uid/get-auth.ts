import prisma from '@/lib/prisma';
import StatusResponse from '@/lib/status-response';

const getAuth = async (uid: string) : Promise<StatusResponse> => {
  try {
    const user = await prisma.auth.findUnique({
      where: { uid: uid },
    });

    if (user === null) {
      return { status: 1 };
    }
    return {
      email: user.email,
      password: user.password,
      status: 0,
    };

  } catch (err) {
    console.log(err)
  }
  return { status: -1 };
};

export default getAuth;
