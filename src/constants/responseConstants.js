export const RESPONSE_CONSTANTS = {
  'InvalidFieldError': () => [`Invalid value for field`, 400],
  'UnauthorizedError': () => ['Unauthorized access', 401],
  'IncorrectPasswordError': () => ['Incorrect password or email', 401],
  'InternalServerError': () => ['Internal Server Error', 500],
  'ValidationError': ()=>['Invalid', 400],
  'ForbiddenError': ()=>['Forbidden Access', 403],
  'NotFoundError': ()=>['Not Found', 404],
  'UserNotFoundError': ()=>['User not found or Does not exists', 404],
  'RequiredFieldError': ()=> ['Fields are missing', 400],
  'AlreadyExistsError': ()=>['Resource Already Exists', 400],
  'IncorrectPasswordLengthError': ()=>['Password length must be 8 characters or more', 400],
  'TokenExpiredError': () => ['Token has been expired please refresh token', 401]
}