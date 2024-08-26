import prisma from '@/lib/server/prisma';
import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';

const addConnection = async (
  send_uid: string, recip_uid: string
) : Promise<StatusResponse> => {

  try {

    const user = await prisma.connections.create({
      data: {
        sender_uid: send_uid,
        receiver_uid: recip_uid,
        status: 'PENDING',
      },
    });

    return {
      status: ActionResponseStatus.SUCCESS
    };

  } catch (err) {

    console.log(err)

  }

  return {
    status: ActionResponseStatus.ERROR
  }
  
};

export default addConnection;
