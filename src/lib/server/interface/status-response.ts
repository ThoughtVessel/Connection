/*
Template response for EVERY src/action method
*/

import ActionResponseStatus from '@/lib/server/enum/action-response-status'

interface StatusResponse {
  status: ActionResponseStatus;
  [key: string]: any;
}

export default StatusResponse;
