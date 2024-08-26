import prisma from '@/lib/server/prisma';
import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';

const createProfileDB = async (
  uid: string, firstName: string, lastName: string, username: string
) : Promise<StatusResponse> => {

  try {

    const user = await prisma.profile.create({
      data: {
        uid: uid,
        first_name: firstName,
        last_name: lastName,
        username: username
      },
    });

    console.log("created")

    return {
      status: ActionResponseStatus.SUCCESS
    };

  } catch (err) {

    console.log(err);

  }

  return {
    status: ActionResponseStatus.ERROR
  }

};

export default createProfileDB;
