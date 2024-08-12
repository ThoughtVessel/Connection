import prisma from '@/lib/prisma';
import StatusResponse from '@/lib/status-response';

const getConnectionDB = async (uid1: string, uid2: string) : Promise<StatusResponse> => {
  try {
    const user = await prisma.connections.findFirst({
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
        ],
      },
    });

    if (user === null || user === {}) {
      return { status: 1 };
    }
    return {
      sender_uid: user.sender_uid,
      receip_uid: user.receiver_uid,
      req_status: user.status,
      status: 0,
    };

  } catch (err) {
    console.log(err)
  }
  return { status: -1 };
};

export default getConnectionDB;
