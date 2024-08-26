/*
Return status of EVERY src/action method
*/

enum ActionResponseStatus {
  // Internal error
  ERROR = -1,
  // Action performed as intended
  SUCCESS = 0,
  BAD_TOKEN = 1,
  INVALID_UID = 2,
  WRONG_PASSWORD = 3,
  // No response returned from DB pull with expected response
  BAD_DB_PULL = 4,
  // When attempt to get a nonexistant thing
  GET_NONEXISTANT = 5,
  // Parameter is invalid
  INVALID_PARAMETER = 6,
  UNAUTHORIZED = 7,
  FAILURE_TO_COMPLETE = 8,
  ALREADY_EXISTS = 9,


}

export default ActionResponseStatus;
