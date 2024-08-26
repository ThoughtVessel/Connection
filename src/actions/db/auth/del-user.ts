import prisma from '@/lib/server/prisma';
import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';

const deleteUserDB = async (
  uid: string
) : Promise<StatusResponse> => {

  try {

    const user = await prisma.auth.delete({
      where: {
        uid: uid,
      },
    });

    if (user === null || user.uid !== uid) {

      return {
        status: ActionResponseStatus.GET_NONEXISTANT
      };

    }

    return {
      status: ActionResponseStatus.SUCCESS
    };

  } catch (err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  };
  
};

export default deleteUserDB;
