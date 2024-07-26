import prisma from '@/lib/prisma';
import StatusResponse from '@/lib/status-response';


const getDataFromEmail = async (email: string) : Promise<StatusResponse> => {
  try {
    const user = await prisma.auth.findUnique({
      where: { email: email },
    });

    if (user === null) {
      return { status: 1 };
    }
    return {
      uid: user.uid,
      email: user.email,
      password: user.password,
      status: 0,
    };

  } catch (err) {
    console.log(err)
  }
  return { status: -1 };
};

export default getDataFromEmail;
