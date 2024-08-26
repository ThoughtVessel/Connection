import prisma from '@/lib/server/prisma';
import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';


const getDataFromEmail = async (
  email: string
) : Promise<StatusResponse> => {

  try {

    const user = await prisma.auth.findUnique({
      where: { email: email },
    });

    if (user === null) {

      return { status: ActionResponseStatus.GET_NONEXISTANT };

    }

    return {
      uid: user.uid,
      password: user.password,
      status: ActionResponseStatus.SUCCESS,
    };

  } catch (err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  };
  
};

export default getDataFromEmail;
