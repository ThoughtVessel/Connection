import prisma from '@/lib/server/prisma';
import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';

const getProfileDB = async (
  uid: string
) : Promise<StatusResponse> => {

  try {

    const user = await prisma.profile.findUnique({
      where: { uid: uid },
    });

    if (user === null) {

      return {
        status: ActionResponseStatus.GET_NONEXISTANT
      };

    }

    return {
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      status: ActionResponseStatus.SUCCESS,
    };

  } catch (err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  };

};

export default getProfileDB;
