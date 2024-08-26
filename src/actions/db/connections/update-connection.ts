import prisma from '@/lib/server/prisma';
import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';

const updateConnectionDB = async (
  send_uid: string, recip_uid: string, accept: boolean
) : Promise<StatusResponse> => {

  try {

    const user = await prisma.connections.updateMany({
      data: {
        sender_uid: recip_uid,
        receiver_uid: send_uid,
        status: (accept) ? 'ACCEPTED' : 'REJECTED',
      },
    });

    if (user.count === 0) {

      return {
        status: ActionResponseStatus.GET_NONEXISTANT
      };

    }

    return {
      status: ActionResponseStatus.SUCCESS
    }

  } catch (err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  }
};

export default updateConnectionDB;
