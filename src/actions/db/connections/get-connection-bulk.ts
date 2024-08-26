import prisma from '@/lib/server/prisma';
import StatusResponse from '@/lib/server/interface/status-response';
import ActionResponseStatus from '@/lib/server/enum/action-response-status';

const getConnectionBulkDB = async (
  uid: string, count: number, index: number, sortby: string, status: string
) : Promise<StatusResponse> => {

  try {

    const connections = await prisma.connections.findMany({
      where: {
        OR: [
          {
            sender_uid: uid,
          },
          {
            receiver_uid: uid,
          },
        ],
      },
    orderBy: {
        [sortby]: 'asc',
    },
    skip: index * count,
    take: count,
  });

  return {
    status: ActionResponseStatus.SUCCESS,
    data: connections
  };

  } catch (err) {

    console.log(err)

  }

  return {
    status: ActionResponseStatus.ERROR
  };

};

export default getConnectionBulkDB;
