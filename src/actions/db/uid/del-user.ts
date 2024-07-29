import prisma from '@/lib/prisma';
import StatusResponse from '@/lib/status-response';

const deleteUserDB = async (uid: string) : Promise<StatusResponse> => {
  try {
    console.log("UID " + uid)

    const user = await prisma.auth.delete({
      where: {
        uid: uid,
      },
    });

    if (user === null || user.uid != uid) {
      return { status: 1 };
    }
    return { status: 0 };

  } catch (err) {
    console.log(err)
  }
  return { status: -1 };
};

export default deleteUserDB;
