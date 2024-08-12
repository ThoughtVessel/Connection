import prisma from '@/lib/prisma';
import StatusResponse from '@/lib/status-response';

const updateConnectionDB = async (send_uid: string, recip_uid: string, accept: bool) : Promise<StatusResponse> => {
  try {
    const user = await prisma.connections.updateMany({
      data: {
        sender_uid: recip_uid,
        receiver_uid: send_uid,
        status: (accept) ? 'ACCEPTED' : 'REJECTED',
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

export default updateConnectionDB;
