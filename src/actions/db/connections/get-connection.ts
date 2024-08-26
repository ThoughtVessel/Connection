import prisma from '@/lib/server/prisma';
import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';

const getConnectionDB = async (
  uid1: string, uid2: string
) : Promise<StatusResponse> => {

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

    if (user == null) {

      return {
        status: ActionResponseStatus.GET_NONEXISTANT
      };

    }

    return {
      sender_uid: user.sender_uid,
      receip_uid: user.receiver_uid,
      req_status: user.status,
      status: ActionResponseStatus.SUCCESS,
    };

  } catch (err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  };
  
};

export default getConnectionDB;
