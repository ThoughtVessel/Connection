import prisma from '@/lib/server/prisma';
import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';

const checkUsername = async (
  username: string
) : Promise<StatusResponse> => {

  try {

    const user = await prisma.profile.findUnique({
      where: { username: username },
    });

    if (user === null) {

      return {
        status: ActionResponseStatus.GET_NONEXISTANT
      };

    }

    return {
      status: ActionResponseStatus.SUCCESS,
    };

  } catch (err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  };

};

export default checkUsername;
