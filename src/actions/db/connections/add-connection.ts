import prisma from '@/lib/prisma';
import StatusResponse from '@/lib/status-response';

const addConnection = async (send_uid: string, recip_uid: string) : Promise<StatusResponse> => {
  try {
    const user = await prisma.connections.create({
      data: {
        sender_uid: send_uid,
        receiver_uid: recip_uid,
        status: 'PENDING',
      },
    });
    return {
      status: 0
    };

  } catch (err) {
    console.log(err)
  }
  return { status: -1 }
};

export default addConnection;
