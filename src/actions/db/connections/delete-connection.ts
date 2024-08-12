import prisma from '@/lib/prisma';
import StatusResponse from '@/lib/status-response';

const deleteConnectionDB = async (uid1: string, uid2: string) : Promise<StatusResponse> => {
  try {
    const user = await prisma.connections.deleteMany({
      where: {
        OR: [
          {
            sender_uid: uid1,
            receiver_uid: uid2,
          },
          {
            sender_uid: uid2,
            receiver_uid: uid1,
          },
        ]
      },
    });
    if (user.count === 0) {
      return { status: 1 };
    }
    return {status: 0}

  } catch (err) {
    console.log(err)
  }
  return { status: -1 }
};

export default deleteConnectionDB;
